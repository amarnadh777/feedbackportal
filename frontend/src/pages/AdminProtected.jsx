import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminProtected({ children }) {
  const userData = useSelector((state) => state.authReducer.userData);
  const token = localStorage.getItem("token");

  if (userData?.role !== "admin" || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminProtected;
