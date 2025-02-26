@echo off

REM TODO: PostGres startup

REM Set current working directory to here
pushd "%~dp0"

set venv_name=senv

if not exist "%venv_name%\Scripts\activate" (
  echo python virtual environment 'senv' not found; creating...
  call python -m venv senv || echo Could not create senv && goto error
)

REM Activate the senv python virtual environment
echo Activating senv
call "%venv_name%\Scripts\activate" || echo Failed to activate senv && goto error

REM Install requirements onto the senv virtual environment
echo Installing pythong requirements
call python -m pip install -r requirements.txt || echo Failed to install senv requirements && goto error

REM Build the frontend (Update the dist folder)
echo Building frontend
cd frontend
call npm run build || echo Failed to build frontend && goto error

REM Run the backend, which will deploy frontend
echo Starting backend
cd ..

REM "dev" makes it auto-reload. use "run" for actual server.
start python -m fastapi dev backend/main.py || echo Failed to start backend && goto error

:error
REM Deactivate senv if it exists
if exist "%venv_name%\Scripts\activate" (
  echo Deactivating senv
  call "%venv_name%\Scripts\deactivate.bat"
)

REM Restore cwd
popd