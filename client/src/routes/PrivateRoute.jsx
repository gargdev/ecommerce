import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminRequired = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // If not logged in, redirect to login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If admin privileges are required and the user is not an admin, redirect to home
  if (adminRequired && userInfo.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and admin if required), render the child component
  return children;
};

export default PrivateRoute;
