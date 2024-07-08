@echo off

REM Navigate to the backend directory
cd C:\Users\Seawrights\Documents\PUC\MVP_Software_Architecture\jrpreneur

REM Build the Docker image for the Flask backend
docker build -t my-flask-app .

REM Run the Docker container for the Flask backend
docker run -d -p 5000:5000 my-flask-app

REM Navigate to the frontend directory
cd C:\Users\Seawrights\Documents\PUC\MVP_Software_Architecture\jrpreneur\frontend

REM Start the React frontend
start cmd /k "npm start"

echo "Backend and frontend are starting up..."
