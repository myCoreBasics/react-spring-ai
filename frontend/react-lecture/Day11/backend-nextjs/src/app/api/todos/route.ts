import { NextRequest, NextResponse } from 'next/server';
import { getAllTodos, createTodo } from '@/lib/data';
import { ApiResponse, Todo, CreateTodoInput } from '@/types/todo';

/**
 * GET /api/todos
 * 모든 할 일 목록을 조회합니다.
 */
export async function GET(): Promise<NextResponse<ApiResponse<Todo[]>>> {
  try {
    const todos = getAllTodos();
    return NextResponse.json({
      success: true,
      data: todos,
      message: '할 일 목록을 성공적으로 조회했습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '할 일 목록 조회 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/todos
 * 새로운 할 일을 생성합니다.
 * 
 * Body:
 * - title: string (필수)
 * - description: string (선택)
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Todo>>> {
  try {
    const body: CreateTodoInput = await request.json();

    // 유효성 검사
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'title은 필수 항목입니다.',
        },
        { status: 400 }
      );
    }

    if (body.title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'title은 빈 문자열일 수 없습니다.',
        },
        { status: 400 }
      );
    }

    const newTodo = createTodo(body.title.trim(), body.description?.trim());
    
    return NextResponse.json(
      {
        success: true,
        data: newTodo,
        message: '할 일이 성공적으로 생성되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '할 일 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

