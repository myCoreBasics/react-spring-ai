import { NextRequest, NextResponse } from 'next/server';

// CORS 허용 오리진 설정
const getAllowedOrigins = () => {
  const origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];
  
  // 환경 변수에서 추가 오리진 설정
  if (process.env.ALLOWED_ORIGINS) {
    origins.push(...process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()));
  }
  
  return origins;
};

export function middleware(request: NextRequest) {
  // OPTIONS preflight 요청 처리
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(request),
    });
  }

  // 실제 요청에 CORS 헤더 추가
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(request);
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') || '';
  const allowedOrigins = getAllowedOrigins();
  
  // 오리진 검증 (허용된 오리진이거나 동일 출처)
  const isAllowed = allowedOrigins.includes(origin) || !origin;
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

// API 라우트에만 미들웨어 적용
export const config = {
  matcher: '/api/:path*',
};

