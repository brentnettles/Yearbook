import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './CreateUserContext.jsx'; // Ensure this path is correct
import App from './App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login';
import CohortList from './components/CohortList.jsx';
import Yearbook from './components/Yearbook.jsx';
import StudentDetails from './components/StudentDetails.jsx';
import StudentCard from './components/StudentCard.jsx'; // Ensure this is correctly imported
import SignatureForm from './components/SignatureForm.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import './App.css';
import { userLoader, cohortLoader, yearbookLoader, studentDetailsLoader, createSignatureLoader } from './loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/cohorts', element: <CohortList />, loader: cohortLoader },
      { path: '/yearbook/:cohortId', element: <Yearbook />, loader: yearbookLoader },
      { path: '/student-card/:studentId', element: <StudentCard />, loader: studentDetailsLoader },  // Adjusted for StudentCard
      { path: '/student-details/:studentId', element: <StudentDetails />, loader: studentDetailsLoader },  // Correct route for StudentDetails
      { path: '/signatures/new', element: <SignatureForm />, loader: createSignatureLoader }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);