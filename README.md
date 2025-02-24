# Stock Sentiment Analyzer

## Description


## Requirements
- Python
- Web Browser
- Internet Connectivity

## Environment Setup
In a terminal, do the following
1. Enter `backend/` folder
1. Create new python environment `python -m venv senv`
1. Activate new python environment
	- For Windows: `"senv/Scripts/activate"`
1. Install python packages `pip install -r requirements.txt`

## Build & Run Instructions
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