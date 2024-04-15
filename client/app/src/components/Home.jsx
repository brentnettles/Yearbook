import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const [user] = useOutletContext(); // Ensure that Outlet is providing the expected context

  return (
    <div className='home-background'>
      <h1>FLATIRON SCHOOL</h1>
      <h2>Student Yearbooks</h2>

      {user && user.username ? <p>Welcome Back, {user.username}!</p> : <p>Please log in to view this page.</p>}
    </div>
  );
}

export default Home;
