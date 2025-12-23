export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀 Next.js REST API Server</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        간단한 Todo CRUD API 서버입니다.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📡 API Endpoints</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Method</th>
              <th style={{ padding: '0.75rem' }}>Endpoint</th>
              <th style={{ padding: '0.75rem' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}><code style={{ background: '#22c55e', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>GET</code></td>
              <td style={{ padding: '0.75rem' }}><code>/api/todos</code></td>
              <td style={{ padding: '0.75rem' }}>모든 할 일 조회</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}><code style={{ background: '#eab308', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>POST</code></td>
              <td style={{ padding: '0.75rem' }}><code>/api/todos</code></td>
              <td style={{ padding: '0.75rem' }}>새 할 일 생성</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}><code style={{ background: '#22c55e', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>GET</code></td>
              <td style={{ padding: '0.75rem' }}><code>/api/todos/:id</code></td>
              <td style={{ padding: '0.75rem' }}>특정 할 일 조회</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}><code style={{ background: '#3b82f6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>PUT</code></td>
              <td style={{ padding: '0.75rem' }}><code>/api/todos/:id</code></td>
              <td style={{ padding: '0.75rem' }}>할 일 수정</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}><code style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>DELETE</code></td>
              <td style={{ padding: '0.75rem' }}><code>/api/todos/:id</code></td>
              <td style={{ padding: '0.75rem' }}>할 일 삭제</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝 사용 예시 (cURL)</h2>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`# 전체 조회
curl http://localhost:3000/api/todos

# 생성
curl -X POST http://localhost:3000/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{"title": "새 할일"}'

# 수정
curl -X PUT http://localhost:3000/api/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'

# 삭제
curl -X DELETE http://localhost:3000/api/todos/1`}
        </pre>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📦 응답 형식</h2>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`{
  "success": true,
  "data": { ... },
  "message": "성공 메시지"
}

// 에러 시
{
  "success": false,
  "error": "에러 메시지"
}`}
        </pre>
      </section>
    </main>
  );
}
