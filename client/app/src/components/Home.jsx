import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const [user] = useOutletContext(); // Ensure that Outlet is providing the expected context

  return (
    <>
      <h2>Home Page</h2>
      {user && user.username ? <p>Welcome {user.username}!</p> : <p>Please log in to view this page.</p>}
    </>
  );
}

export default Home;
