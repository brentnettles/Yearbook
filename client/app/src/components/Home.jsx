import React from 'react';
import { useUserContext } from './CreateUserContext'; // Ensure the path is correct

const Home = () => {
  const { user } = useUserContext();

  return (
    <div className='home-container'>
      <div className='logo-container'>
        <img src='/images/logo.jpeg' alt='School Logo' className='home-logo'/>
      </div>
      <h2 className='home-title'>Flatiron School</h2>
      <h3 className='home-subtitle'>Student Year Books</h3>
      {user ? <p className='home-welcome-message'>Welcome {user.name}!</p> : <p>Please log in to view this page.</p>}
    </div>
  );
};

export default Home;