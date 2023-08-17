import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import AuthContext from './AuthContex';
export const AuthContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const isLoging = user ? true : false;
  const login = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const values = { user, isLoging, login, logOut };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};