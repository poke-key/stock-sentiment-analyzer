# Stock Sentiment Analyzer

## Description


## Requirements
- Python
- Web Browser
- NPM
- Postgres DB (free)
- Internet Connectivity

## Python Setup
- Make sure to click "add to path" checkbox if installing.
- If not, you will need to set absolute path in build.bat

## Postgres Environment Setup
1. Go to https://www.postgresql.org/download/ to download and install Postgres
1. Make sure to also check the "pgadmin" option, for easier management
1. Make sure to remember your user/pass as you'll need it later
1. Open pgadmin and connect to the server
	1. You may need to verify your port for the server
1. Right click your server and create a database with any name you want (mydb)

## First time frontend setup
1. Enter frontend directory in a terminal
1. Enter "npm install", which installs dependencies

## Environment File Setup
1. Create a `.env` file in the backend folder and enter private information.
	1. For a example open the `.env.example` file
	1. The var names shouldn't be changed.
### Database URL (PostGres)
1. The formal spec for the url is 
	1. `postgresql://[user]:[password]@[ip]:[port]/[dbname]`
	1. Default port is 5432, if you haven't changed it
### Signup Pass
1. Enter any pass you want to use while registering. Mine is "hi".
1. Done!

# Automatic Build and Run (Windows)
1. Run `build.bat` while in the project directory (see backend and frontend folders)
1. This will setup python virtual environment, and update python dependencies as well.

# Manual Setup (Why do you hate yourself?)
- Make sure to do above setup instructions if you havent.

## Python Environment Setup
In a terminal, do the following
1. Enter project root folder
1. Create new python environment `python -m venv senv`
1. Activate new python environment
	- For Windows: `"senv/Scripts/activate"`
1. Install python packages `pip install -r requirements.txt`

## Build & Run Instructions (Manual)
In a terminal, do the following
1. Enter `frontend/` directory.
1. Enter command `npm run build` (generates dist directory)
1. Enter project root directory
	- Should see both `backend/` and `frontend/` directories.
1. Activate new python environment
	- For Windows: `"backend/senv/Scripts/activate.bat"`
1. Enter command `fastapi dev backend/main.py` (Deploys local server)
	- You should see a message like `Uvicorn running on <URL>`.
	- Go to the URL to see the frontend in action.

## Python Dependency Changes (For developers)
In a terminal, do the following
1. Enter `backend/` directory
1. Enter command `pip freeze > requirements.txt`
	- This generates an updated list of dependencies for any new developers setting up their environment