import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

// POST /api/auth/signup - 회원가입
export async function POST(request: NextRequest): Promise<NextResponse>{
  try {
    const body = await request.json();
    const { email, password, name } = body;
    // 유효성 검증
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '이메일, 비밀번호, 이름은 필수입니다' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 형식이 아닙니다' },
        { status: 400 }
      );
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 6자 이상이어야 합니다' },
        { status: 400 }
      );
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);
    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email);
    return NextResponse.json({
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

