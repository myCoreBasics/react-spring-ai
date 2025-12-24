import { NextRequest, NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '@/lib/data';
import { ApiResponse, Todo, UpdateTodoInput } from '@/types/todo';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/todos/[id]
 * 특정 할 일을 조회합니다.
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Todo>>> {
  try {
    const { id } = await params;
    const todo = getTodoById(id);

    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          error: `ID가 ${id}인 할 일을 찾을 수 없습니다.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: todo,
      message: '할 일을 성공적으로 조회했습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '할 일 조회 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/todos/[id]
 * 특정 할 일을 수정합니다.
 * 
 * Body:
 * - title: string (선택)
 * - description: string (선택)
 * - completed: boolean (선택)
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Todo>>> {
  try {
    const { id } = await params;
    const body: UpdateTodoInput = await request.json();

    // 빈 업데이트 체크
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: '수정할 내용을 입력해주세요.',
        },
        { status: 400 }
      );
    }

    // 유효성 검사
    if (body.title !== undefined && typeof body.title !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'title은 문자열이어야 합니다.',
        },
        { status: 400 }
      );
    }

    if (body.completed !== undefined && typeof body.completed !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          error: 'completed는 불리언 값이어야 합니다.',
        },
        { status: 400 }
      );
    }

    const updates: UpdateTodoInput = {};
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.completed !== undefined) updates.completed = body.completed;

    const updatedTodo = updateTodo(id, updates);

    if (!updatedTodo) {
      return NextResponse.json(
        {
          success: false,
          error: `ID가 ${id}인 할 일을 찾을 수 없습니다.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedTodo,
      message: '할 일이 성공적으로 수정되었습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '할 일 수정 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/todos/[id]
 * 특정 할 일을 삭제합니다.
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = await params;
    const deleted = deleteTodo(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: `ID가 ${id}인 할 일을 찾을 수 없습니다.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: '할 일이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '할 일 삭제 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}


curl -X POST http://localhost:3000/api/todos  -H "Content-Type: application/json"   -d '{"title": "새 할일"}'