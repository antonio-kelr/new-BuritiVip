import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const TokenDeacesso: React.FC = () => {
  const token = localStorage.getItem('token');

  

  return token ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default TokenDeacesso;
