import React, { useState, useEffect } from 'react';
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Directly set a hardcoded user for development testing
    setUser({
      user_id: 1,
      username: 'Test_User'
    });
  }, []);

  return (
    <>
      <header>
        <NavBar user={user} />  {/* Pass user to NavBar */}
      </header>
      {user ? (
        <Outlet context={[user]} />  // Render child routes only if user is set
      ) : (
        <p>Please log in to view this page.</p>  // Fallback message (shouldn't actually show in this setup)
      )}
    </>
  );
}