import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from './context/Auth/AuthContextProvider';

const NavigationBar = () => {
  const { isLoging, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoging ? (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
