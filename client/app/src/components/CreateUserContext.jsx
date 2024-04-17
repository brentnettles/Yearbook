import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = Cookie.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
