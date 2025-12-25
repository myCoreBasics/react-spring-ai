import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest, verifyPassword, hashPassword } from '@/lib/auth';

// GET /api/users/me - 현재 사용자 정보 조회
export async function GET(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 정보 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// PUT /api/users/me - 사용자 정보 업데이트
export async function PUT(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 업데이트할 데이터
    const updateData: { name?: string; password?: string } = {};

    if (name) {
      updateData.name = name;
    }

    // 비밀번호 변경
    if (currentPassword && newPassword) {
      const isValid = await verifyPassword(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: '현재 비밀번호가 올바르지 않습니다' },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: '새 비밀번호는 6자 이상이어야 합니다' },
          { status: 400 }
        );
      }

      updateData.password = await hashPassword(newPassword);
    }

    // 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: auth.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ...updatedUser,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
      message: newPassword ? '비밀번호가 변경되었습니다' : '정보가 업데이트되었습니다',
    });
  } catch (error) {
    console.error('사용자 정보 업데이트 오류:', error);
    return NextResponse.json(
      { error: '사용자 정보 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/me - 계정 삭제
export async function DELETE(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    await prisma.user.delete({
      where: { id: auth.userId },
    });

    return NextResponse.json({
      message: '계정이 성공적으로 삭제되었습니다',
    });
  } catch (error) {
    console.error('계정 삭제 오류:', error);
    return NextResponse.json(
      { error: '계정 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

