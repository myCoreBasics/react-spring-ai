import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse>{
    try{
        const body = await request.json();
        const {email, password } = body;
        if(!email || !password){
            return NextResponse.json({error: '이메일과 패스워드는 필수입니다. '},{status: 400});
        }
        const user = await prisma.user.findUnique({
            where: {email}, 
        });
        if(!user){
            return NextResponse.json(
                { error: '이메일 또는 비밀번호가 올바르지 않습니다' },
                { status: 401 }
            );
        }
        
        const isValid = await verifyPassword(password, user.password);
        if(!isValid){
            return NextResponse.json(
                { error: '이메일 또는 비밀번호가 올바르지 않습니다' },
                { status: 401 }
            );
        }

        const token = generateToken(user.id, user.email);

        return NextResponse.json({
            token, 
            userId: user.id,
            email: user.email,
            name: user.name
        });
    }catch(error){
        console.error(error);
        return NextResponse.json(
            { error: '로그인 중 오류가 발생했습니다' },
            { status: 500 }
        );
    }
}