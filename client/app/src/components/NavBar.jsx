import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './CreateUserContext';
import Cookie from 'js-cookie';

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuLeave = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <input type="checkbox" className="navbar-menu-toggle" id="menu-toggle" checked={menuOpen} onChange={toggleMenu} />
      <label htmlFor="menu-toggle" className="navbar-menu-icon">&#9776;</label>
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`} onMouseLeave={handleMenuLeave}>
        <div className="navbar-menu-items">
          <Link to="/" className="navbar-menu-item">Home</Link>
          <Link to="/cohorts" className="navbar-menu-item">Cohorts</Link>
          {user ? (
            <button className="navbar-menu-item" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="navbar-menu-item">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
