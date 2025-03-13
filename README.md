# Stock Sentiment Analyzer

## Description


## Requirements
- Python
- Web Browser
- Internet Connectivity

## Python Environment Setup
In a terminal, do the following
1. Enter `backend/` folder
1. Create new python environment `python -m venv senv`
1. Activate new python environment
	- For Windows: `"senv/Scripts/activate"`
1. Install python packages `pip install -r requirements.txt`

## Postgres Environment Setup
1. Go to https://www.postgresql.org/download/ to download and install Postgres
1. Make sure to also check the "pgadmin" option, for easier management
1. Make sure to remember your user/pass as you'll need it later
1. Open pgadmin and connect to the server
	1. You may need to verify your port for the server
1. Right click your server and create a database with any name you want
1. Create a `.env` file in the backend folder and enter the URL for the database
	1. For a example open the `.env.example` file
	1. The var names shouldn't be changed.
	1. The formal spec for the url is 
		1. `postgresql://[user]:[password]@[ip]:[port]/[dbname]`
1. Done!

## Build & Run Instructions (Windows)
1. Run build.bat

## Build & Run Instructions (Manual)
In a terminal, do the following
1. Enter `frontend/` directory.
1. Enter command `npm run build` (generates dist directory)
1. Enter project root directory
	- Should see both `backend/` and `frontend/` directories.
1. Activate new python environment
	- For Windows: `"backend/senv/Scripts/activate"`
1. Enter command `python -m fastapi dev backend/main.py` (Deploys local server)
	- You should see a message like `Uvicorn running on <URL>`.
	- Go to the URL to see the frontend in action.

## Python Dependency Changes
In a terminal, do the following
1. Enter `backend/` directory
1. Enter command `pip freeze > requirements.txt`
	- This generates an updated list of dependencies for any new developers setting up their environment