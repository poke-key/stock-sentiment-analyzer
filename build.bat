@echo off

REM Set current working directory to here
pushd "%~dp0"

REM Build the frontend (Update the dist folder)
echo Building frontend
cd frontend
call npm run build || echo Failed to build frontend && goto error
cd ..

build_backend.bat