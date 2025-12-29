import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // API 전용 모드 (페이지 렌더링 최소화)
  reactStrictMode: true,
  
  // 환경 변수
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },

  // CORS 및 헤더 설정 (외부 서버 접근 허용)
  async headers() {
    return [
      {
        // 모든 API 라우트에 CORS 헤더 적용
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,PATCH,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
        ],
      },
    ];
  },

  // 서버 외부 접근 설정 (모든 네트워크 인터페이스에서 수신)
};

export default nextConfig;

