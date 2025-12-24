import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';



export async function POST(request: NextRequest): Promise<NextResponse>{

    try{
        const body = await request.json();
        const { email, password, name} = body;
        //
        if(!email || !password || !name){
            return NextResponse.json({error: 'EMAIL, Password, Name 은 필수!'}, {status: 400} );
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

        const existingUser = await prisma.user.findUnique({where: {email},});
        if(existingUser){
            return NextResponse.json({error: ''}, {status: 400});
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data:{
                email, password:hashedPassword,
                name,
            }
        });

        const token = generateToken(user.id, user.email);

        return NextResponse.json({
            token, 
            userId: user.id,
            email: user.email, 
            name: user.name,
        });


    }catch(error){
        console.log('signup error!', error);
         return NextResponse.json(
            { error: '회원가입 중 오류가 발생했습니다' },
            { status: 500 }
        );
    }

}