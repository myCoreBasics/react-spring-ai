# Todo Backend API

Spring Boot 기반의 Todo List 백엔드 API 서버입니다.

## 기술 스택
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (인메모리)
- Maven

## 실행 방법

### 간단한 실행 (권장)
Windows에서 `start.bat` 파일을 더블클릭하거나:

```bash
cd backend
start.bat
```

### 수동 실행
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

### Maven이 설치된 경우
```bash
cd backend
mvn spring-boot:run
```

## API 엔드포인트

서버가 실행되면 `http://localhost:8080`에서 API를 사용할 수 있습니다.

### GET /api/tasks
모든 태스크 조회
- Query Parameter: `userId` (선택사항)

### POST /api/tasks
새 태스크 생성
- Request Body:
```json
{
  "title": "할 일 내용",
  "done": false,
  "userId": "USER_10"
}
```

### PUT /api/tasks/{id}
태스크 수정
- Request Body:
```json
{
  "title": "수정된 내용",
  "done": true
}
```

### DELETE /api/tasks/{id}
태스크 삭제

## H2 Console

개발 중 데이터베이스 확인:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (비어있음)

## CORS 설정

모든 origin에서의 요청을 허용하도록 설정되어 있습니다. (개발용)


