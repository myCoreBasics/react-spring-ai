@echo off
cd /d %~dp0

REM JAVA_HOME 설정 (환경 변수가 없을 경우)
if "%JAVA_HOME%"=="" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-25"
    echo JAVA_HOME set to: %JAVA_HOME%
) else (
    echo Using JAVA_HOME: %JAVA_HOME%
)

REM Java 설치 확인
if not exist "%JAVA_HOME%\bin\java.exe" (
    echo Error: Java not found at %JAVA_HOME%
    echo Please set JAVA_HOME environment variable or update this script.
    pause
    exit /b 1
)

echo Starting Spring Boot Backend Server...
.\mvnw.cmd spring-boot:run
pause

