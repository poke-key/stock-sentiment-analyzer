@echo off

set venv_name=senv

if not exist "%venv_name%\Scripts\activate" (
  echo python virtual environment 'senv' not found; creating...
  call python "-m venv senv" || echo ERROR && exit /b
)

REM Activate the senv python virtual environment
echo Activating senv
call "%venv_name%\Scripts\activate" || echo "Failed to activate senv" && exit /b

REM Install requirements onto the senv virtual environment
echo Installing pythong requirements
call python -m pip install -r requirements.txt || echo "Failed to install senv requirements" && exit /b

REM Build the frontend (Update the dist folder)
echo Building frontend
cd ../frontend
call npm run build || echo "Failed to build frontend" && exit /b

REM Run the backend, which will deploy frontend
echo Starting backend
cd ..
call python -m fastapi dev backend/main.py || echo "Failed to start backend" && exit /b

REM Deactivate senv, but it doesnt work. Its fine to leave it