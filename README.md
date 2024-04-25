Site overview :
Fullstack application with Flask / SQLite3 db & Javascript React App

I took portraits of classmates at Flatiron School and made an interactive yearbook.

- Brent Nettles
  04/17/24

              # to run
              Flask / vite / react router v6

              npm install

              * Server  http://127.0.0.1:5555
              * Client/App  http://localhost:5173/

              start server - run
              $ export FLASK_APP=app.py
              $ export FLASK_RUN_PORT=5555
              $ python app.py

              Frontend - run
              $npm run dev

              Restricted data to "Students"
              Login w/ email 1@0.com

              **Actual data and asset only for Cohort01 / se012924***

              seed.py has more play data but very low res student images

This was a one week solo development project. The projects goals were provided and the concept and execution was up to the developer. I hope you like it.

\*\*\*Create a full-stack application with a powerful backend framework. The major learning goals of project include;

Use a Flask API backend with a React frontend.
Have at least three models on the backend, that include the following:
At least two one-to-many relationships.
At least one reciprocal many-to-many relationship.
The many-to-many association model/table must have a user submittable attribute, i.e. an attribute aside from the foreign keys.
Full CRUD actions for at least one resource.
Minimum of create and read actions for EACH resource.

At least one data type validation.
At least one string/number format validation.
Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes.
Connect the client and server using fetch().
