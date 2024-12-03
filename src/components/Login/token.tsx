import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importação do jwtDecode

// Função para verificar se o token está expirado
const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return true; // Se houver erro na decodificação, considera o token como expirado
  }
};

const TokenDeacesso: React.FC = () => {
  const token = localStorage.getItem('token');

  // Verifica se o token está presente e se não expirou
  if (token && !isTokenExpired(token)) {
    return <Outlet />;
  } else {
    // Se o token não existir ou estiver expirado, redireciona para a página de login
    return <Navigate to="/admin/login" />;
  }
};

export default TokenDeacesso;
