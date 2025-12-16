@echo off
echo ====================================
echo Todo List App 실행하기
echo ====================================
echo.

REM dist 폴더 확인
if not exist "dist" (
    echo [오류] dist 폴더가 없습니다!
    echo 먼저 'pnpm build' 명령어로 빌드해주세요.
    pause
    exit /b 1
)

echo dist 폴더를 찾았습니다.
echo.
echo 서버를 시작합니다...
echo 브라우저에서 http://localhost:8000 으로 접속하세요.
echo.
echo 종료하려면 Ctrl+C를 누르세요.
echo.

cd dist

REM Python 확인
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python으로 서버를 시작합니다...
    python -m http.server 8000
    goto :end
)

REM Node.js 확인
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js로 서버를 시작합니다...
    npx http-server -p 8000
    goto :end
)

echo [오류] Python 또는 Node.js가 설치되어 있지 않습니다.
echo.
echo 설치 방법:
echo - Python: https://www.python.org/downloads/
echo - Node.js: https://nodejs.org/
echo.
echo 또는 dist/index.html 파일을 브라우저로 직접 열어도 됩니다.
echo (단, 일부 기능은 백엔드 서버가 필요합니다)

:end
pause

