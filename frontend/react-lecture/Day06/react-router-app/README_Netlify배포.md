# Netlify 배포 가이드

## 배포 방법

### 1. Netlify 계정 만들기
- https://www.netlify.com 접속
- GitHub 계정으로 로그인 (또는 이메일로 가입)

### 2. 배포하기

#### 방법 A: 드래그 앤 드롭 (가장 간단)
1. `pnpm build` 실행
2. `dist` 폴더를 Netlify 사이트에 드래그 앤 드롭
3. 자동으로 배포 완료!

#### 방법 B: GitHub 연동 (자동 배포)
1. 프로젝트를 GitHub에 푸시
2. Netlify에서 "New site from Git" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `pnpm build`
   - Publish directory: `dist`
5. Deploy!

### 3. 친구에게 공유
- Netlify가 자동으로 생성한 URL 공유
- 예: `https://your-app-name.netlify.app`
- 친구가 이 주소만 접속하면 바로 사용 가능!

## ⚠️ 중요: 백엔드 API 설정

현재 앱은 백엔드 API(`http://localhost:8080`)를 사용합니다.

### 옵션 1: 백엔드도 함께 배포
- 백엔드를 Heroku, Railway, Render 등에 배포
- 프론트엔드의 API URL을 배포된 백엔드 URL로 변경

### 옵션 2: 환경 변수 사용 (권장) ✅ 이미 설정됨!
1. Netlify 대시보드 → Site settings → Environment variables
2. 환경 변수 추가:
   - Key: `VITE_API_URL`
   - Value: 배포된 백엔드 URL (예: `https://your-backend.herokuapp.com`)
3. 코드는 이미 환경 변수를 사용하도록 설정되어 있습니다!

### 옵션 3: Mock 데이터 사용
- 백엔드 없이 로컬 스토리지만 사용하도록 변경

## 모바일에서 사용하기
1. 모바일 브라우저에서 Netlify URL 접속
2. "홈 화면에 추가" 클릭
3. 앱처럼 사용 가능! (PWA)

