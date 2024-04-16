import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { UserProvider } from './CreateUserContext.jsx'; // Import the UserProvider
import App from './App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login';
import CohortList from './components/CohortList.jsx';
import Yearbook from './components/Yearbook.jsx';
import StudentDetails from './components/StudentDetails.jsx';
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
      { path: '/login', element: <LoginWrapper /> },
      { path: '/cohorts', element: <CohortList />, loader: cohortLoader },
      { path: '/yearbook/:cohortId', element: <Yearbook />, loader: yearbookLoader },
      { path: '/student/:studentId', element: <StudentDetails />, loader: studentDetailsLoader },
      { path: '/signatures/new', element: <SignatureForm />, loader: createSignatureLoader }
    ]
  }
]);

function LoginWrapper() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access the setUser method from context

  const handleLoginSuccess = (userData) => {
    console.log("Login Successful with:", userData);
    setUser(userData); // Set user in the global context
    navigate('/'); // Redirect to home page on successful login
  };

  return <Login onLogin={handleLoginSuccess} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Wrap the RouterProvider inside the UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
