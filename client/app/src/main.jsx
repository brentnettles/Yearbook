import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login';
import CohortList from './components/CohortList.jsx';
import Yearbook from './components/Yearbook.jsx';
import StudentDetails from './components/StudentDetails.jsx';
import SignatureForm from './components/SignatureForm.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { userLoader, cohortLoader, yearbookLoader, studentDetailsLoader, createSignatureLoader } from './loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <LoginWrapper /> },
      { path: '/cohorts', element: <CohortList />, loader: cohortLoader },
      { path: '/yearbook/:cohortId', element: <Yearbook />, loader: yearbookLoader },
      { path: '/student/:studentId', element: <StudentDetails />, loader: studentDetailsLoader },
      { path: '/signatures/new', element: <SignatureForm />, loader: createSignatureLoader }
    ]
  }
]);

function LoginWrapper() {
  const navigate = useNavigate(); // useNavigate is called inside a functional component

  const handleLoginSuccess = (email, password) => {
    console.log("Login Successful with:", email, password);
    navigate('/'); // Redirect to home page on successful login
  };

  return <Login onLogin={handleLoginSuccess} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
