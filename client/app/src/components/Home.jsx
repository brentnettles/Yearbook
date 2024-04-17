import React from 'react';
import { useUserContext } from './CreateUserContext'; // Ensure the path is correct

const Home = () => {
  const { user } = useUserContext();

  console.log("User Data:", user); // Check what user data is received

  return (
    <div className='home-background'> 

      
        <h2 className='home-test'>Flatiron School</h2>
        <h3>Student Year Books</h3>
        {user ? <p>Welcome {user.name}!</p> : <p>Please log in to view this page.</p>}
      </div>
  );
};

export default Home;
