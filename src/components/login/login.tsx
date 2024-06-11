import axios from 'axios';
import { useEffect, useState } from 'react'

interface AuthContextType {
  
}

const login = () => {
  const [data, setData] = useState<AuthContextType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/agendas');
        setData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();

    return () => {
    };
  }, []); 

  return (
    <div>dados aqui</div>
  ) 
}

export default login
