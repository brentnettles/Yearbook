import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));  // Retrieve the user from session storage

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/check_session', {
        method: 'GET',
        credentials: 'include', 
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        sessionStorage.setItem('user', JSON.stringify(data.user));  // Save user to session storage
      } else {
        setUser(null);
        sessionStorage.removeItem('user');  // Clear session storage
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setUser(null);
      sessionStorage.removeItem('user');  // Ensure session storage is clear on error
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, checkSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
