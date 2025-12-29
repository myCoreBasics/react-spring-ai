import { PrismaClient } from '@prisma/client';

// PrismaClient 인스턴스를 전역으로 관리하여 개발 환경에서 핫 리로딩 시 
// 연결이 누적되는 것을 방지합니다.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

