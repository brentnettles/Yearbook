# Flatiron Yearbook

**Flatiron Yearbook** is an interactive digital yearbook I created during a 7-day solo sprint while studying at Flatiron School's Software Engineering Bootcamp. As a photographer, I took the opportunity to photograph my cohort mates, providing them with updated professional portraits and serve as a time capsule.

### Site Demo Video [here](https://www.dropbox.com/scl/fi/hzz3v70mr3pyzbhclv0m9/Yearbook_Site-Demo.mp4?rlkey=o62oa8zvhiiclvrv5ivn5jkep&dl=0).


## To Run

Navigate to the project directory and set up the environment:

pipenv install 
pipenv shell 

cd yearbook/backend
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
flask run


Open a second terminal for the frontend:

cd yearbook/client/app
npm install
npm run dev


Visit: [http://localhost:5173/](http://localhost:5173/) to see the app in action.

## Goals

- **Create an engaging digital yearbook** for my cohort at Flatiron School.
- **Provide a platform** where students can not only see each other's portraits but also interact through digital signatures.
- **Develop full CRUD capabilities** for at least one resource, with create and read actions for each resource.

## Features

- **Interactive Yearbook**: Browse through student and instructor profiles with ease.
- **Signatures**: Students can leave digital signatures on each other's profiles, enhancing the interactive experience.
- **Authentication**: Restricted access to ensure that only cohort members can log in and interact.

## Notes

- The project is built with real data limited to "Students" of Cohort01 / se012924. Additional low-resolution images are used for testing and demonstration.
- All photographs were taken and edited by me, adding a personal touch and ensuring high-quality portraits for my peers.

## Tech Stack

### Frontend

- **React JS**: for building the user interface.
- **React Router v6**: for navigation between client-side routes.

### Backend

- **Flask**: as the backend framework.
- **SQLite3**: for the database to store user and interaction data.
- **Flask Migrate**: for handling database migrations.

## Database Schema

- **Student**: Contains details like name, image, quote, and associated cohort.
- **Cohort**: Represents a group of students and their instructors.
- **Signature**: Manages the signatures students leave on each other's profiles.

## Example API Endpoints

- `GET /api/yearbook/{cohort_id}`: Fetch all students and instructors related to a specific cohort.
- `POST /api/login`: Authenticate users by their email.
- `POST /api/signatures`: Allow students to submit signatures on other students' profiles.

This project was not only a technical challenge but also a way to contribute something meaningful to my cohort's experience at Flatiron School.

