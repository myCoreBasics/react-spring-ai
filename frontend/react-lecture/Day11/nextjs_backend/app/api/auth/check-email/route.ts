import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/auth/check-email?email=xxx - 이메일 중복 확인
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    // 이메일 파라미터 검증
    if (!email) {
      return NextResponse.json(
        { available: false, message: '이메일 파라미터가 필요합니다' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { available: false, message: '유효한 이메일 형식이 아닙니다' },
        { status: 400 }
      );
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const available = !existingUser;

    return NextResponse.json({
      available,
      message: available ? '사용 가능한 이메일입니다' : '이미 사용 중인 이메일입니다',
    });
  } catch (error) {
    console.error('이메일 확인 오류:', error);
    return NextResponse.json(
      { available: false, message: '이메일 확인 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

