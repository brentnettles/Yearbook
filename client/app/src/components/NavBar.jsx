import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cohorts">Cohorts</Link>
        <Link to="/instructors">Instructors</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="expanded-content">
       
        
      </div>
    </nav>
  );
}

export default NavBar;
