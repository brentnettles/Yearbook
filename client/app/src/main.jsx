import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './CreateUserContext'; // Ensure this path is correct
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import CohortList from './components/CohortList';
import Yearbook from './components/Yearbook';
import StudentDetails from './components/StudentDetails';
import StudentCard from './components/StudentCard';
import SignatureForm from './components/SignatureForm';
import ErrorPage from './components/ErrorPage';
import './App.css';
import { userLoader, cohortLoader, yearbookLoader, studentDetailsLoader, createSignatureLoader } from './loaders';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this component path is correct

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: '/login', element: <Login /> },
      { path: '/cohorts', element: <ProtectedRoute><CohortList /></ProtectedRoute>, loader: cohortLoader },
      { path: '/yearbook/:cohortId', element: <ProtectedRoute><Yearbook /></ProtectedRoute>, loader: yearbookLoader },
      { path: '/student-card/:studentId', element: <ProtectedRoute><StudentCard /></ProtectedRoute>, loader: studentDetailsLoader },
      { path: '/student-details/:studentId', element: <ProtectedRoute><StudentDetails /></ProtectedRoute>, loader: studentDetailsLoader },
      { path: '/signatures/new', element: <ProtectedRoute><SignatureForm /></ProtectedRoute>, loader: createSignatureLoader }
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
