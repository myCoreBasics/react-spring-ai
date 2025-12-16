# 앱 실행 방법

## 친구에게 파일 공유하기

### 1. 빌드하기
```bash
pnpm install
pnpm build
```

### 2. dist 폴더 공유
- `dist` 폴더 전체를 압축해서 친구에게 전달
- 또는 `dist` 폴더를 USB/클라우드로 공유

### 3. 친구가 실행하는 방법

#### 방법 A: 간단한 서버로 실행 (추천)

**Windows:**
```bash
# dist 폴더로 이동
cd dist

# Python이 설치되어 있다면
python -m http.server 8000

# 또는 Node.js가 있다면
npx http-server -p 8000
```

**Mac/Linux:**
```bash
cd dist
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속

#### 방법 B: 직접 파일 열기
- `dist/index.html` 파일을 더블클릭하거나
- 브라우저로 드래그 앤 드롭

⚠️ **주의:** 백엔드 API가 필요합니다!
- 백엔드 서버(`http://localhost:8080`)도 함께 실행해야 합니다.
- 또는 `src/services/authApi.js`와 `src/services/taskApi.js`의 baseURL을 변경해야 합니다.

### 4. 모바일에서 실행하기

1. 같은 Wi-Fi에 연결
2. 컴퓨터 IP 주소 확인:
   - Windows: `ipconfig` → IPv4 주소
   - Mac/Linux: `ifconfig` 또는 `ip addr`
3. 모바일 브라우저에서 `http://[컴퓨터IP]:8000` 접속
4. 모바일에서 "홈 화면에 추가" 가능 (PWA)

### 5. 완전히 독립적으로 실행하려면

백엔드 없이 실행하려면 Mock 데이터를 사용하도록 변경해야 합니다.

