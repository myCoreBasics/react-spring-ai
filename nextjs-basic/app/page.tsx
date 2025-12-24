export default function Home() {
  return (
    <main style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🧾 Expense Manager API</h1>
      <p>Next.js + Prisma + SQLite 기반 REST API 서버</p>
      
      <h2>📌 API 엔드포인트</h2>
      
      <h3>🔐 인증 API</h3>
      <ul>
        <li><code>POST /api/auth/signup</code> - 회원가입</li>
        <li><code>POST /api/auth/login</code> - 로그인</li>
        <li><code>GET /api/auth/check-email?email=xxx</code> - 이메일 중복 확인</li>
      </ul>
      
      <h3>💰 지출 API</h3>
      <ul>
        <li><code>GET /api/expenses</code> - 모든 지출 내역 조회</li>
        <li><code>GET /api/expenses/paged?page=0&size=10</code> - 페이지네이션 조회</li>
        <li><code>GET /api/expenses/:id</code> - 지출 내역 상세 조회</li>
        <li><code>POST /api/expenses/analyze</code> - 영수증 이미지 분석</li>
        <li><code>DELETE /api/expenses/:id</code> - 지출 내역 삭제</li>
      </ul>
      
      <h3>👤 사용자 API</h3>
      <ul>
        <li><code>GET /api/users</code> - 사용자 목록 조회</li>
        <li><code>POST /api/users</code> - 사용자 추가</li>
        <li><code>GET /api/users/me</code> - 내 정보 조회</li>
        <li><code>PUT /api/users/me</code> - 내 정보 수정</li>
        <li><code>DELETE /api/users/me</code> - 계정 삭제</li>
        <li><code>GET /api/users/:id</code> - 사용자 상세 조회</li>
        <li><code>PUT /api/users/:id</code> - 사용자 수정</li>
        <li><code>DELETE /api/users/:id</code> - 사용자 삭제</li>
      </ul>
      
      <h2>🚀 테스트 계정</h2>
      <ul>
        <li><strong>이메일:</strong> demo@example.com</li>
        <li><strong>비밀번호:</strong> password123</li>
      </ul>
      
      <h2>📚 기술 스택</h2>
      <ul>
        <li>Next.js 14 (App Router)</li>
        <li>Prisma ORM</li>
        <li>SQLite (메모리/파일 DB)</li>
        <li>OpenAI GPT-4 Vision</li>
        <li>JWT 인증</li>
        <li>TypeScript</li>
      </ul>
    </main>
  );
}

