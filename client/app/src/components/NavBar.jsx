import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './CreateUserContext';
import Cookie from 'js-cookie';

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5555/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      Cookie.remove('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cohorts">Cohorts</Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
