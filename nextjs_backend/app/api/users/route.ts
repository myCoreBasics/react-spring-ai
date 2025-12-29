import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest, hashPassword } from '@/lib/auth';

// GET /api/users - 모든 사용자 목록 조회 (페이지네이션 지원)
export async function GET(request: NextRequest) {
  try {
    // 인증 확인
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get('page');
    const sizeParam = searchParams.get('size');

    // 페이지네이션 파라미터가 없으면 전체 목록 반환
    if (pageParam === null && sizeParam === null) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(
        users.map((user) => ({
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }))
      );
    }

    // 페이지네이션 적용
    let page = parseInt(pageParam || '0');
    let size = parseInt(sizeParam || '10');

    if (page < 0) page = 0;
    if (size < 1) size = 10;
    if (size > 100) size = 100;

    const [users, totalElements] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: page * size,
        take: size,
      }),
      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalElements / size);

    return NextResponse.json({
      content: users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
      page,
      size,
      totalElements,
      totalPages,
      hasNext: page < totalPages - 1,
      hasPrevious: page > 0,
    });
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 목록 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// POST /api/users - 사용자 추가
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, password, name, role, status } = body;

    // 유효성 검증
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '이메일, 비밀번호, 이름은 필수입니다' },
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
        role: role || '일반사용자',
        status: status || '활성',
      },
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
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('사용자 추가 오류:', error);
    return NextResponse.json(
      { error: '사용자 추가 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

