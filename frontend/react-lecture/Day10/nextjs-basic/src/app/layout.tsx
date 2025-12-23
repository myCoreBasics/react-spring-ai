import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js REST API Server",
  description: "Simple REST API Server with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
