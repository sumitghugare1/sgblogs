import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check for token in local storage

  return token ? <Component {...rest} /> : <Navigate to="/login" />; // Redirect to login if no token
};

export default PrivateRoute;
