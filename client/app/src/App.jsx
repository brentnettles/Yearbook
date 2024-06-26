import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useUserContext } from './components/CreateUserContext';

const App = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
      if (!user) {
          navigate('/login');
      }
  }, [user, navigate]);

  return (
      <>
          <NavBar />
          {user ? (
              <Outlet /> 
          ) : (
              <p>Please log in to view this page.</p>
          )}
      </>
  );
};

export default App;


