import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expense Manager API',
  description: 'Next.js API 서버 - 영수증 분석 및 지출 관리',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

