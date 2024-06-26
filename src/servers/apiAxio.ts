import axios, { AxiosResponse } from 'axios';

export const APiAxios = axios.create({
  baseURL: 'http://localhost:3002/',
  headers: {
    'Content-Type': 'application/json'
  }
});
export const usuarios = {
  login: (credentials: { email: string, senha: string }): Promise<AxiosResponse<any>> => APiAxios.post('usuarios/entrar', credentials),

};



export const AgendaDados = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('agendas'),
  getById: (agendaId: number): Promise<AxiosResponse<any>> => APiAxios.get(`agendas/${agendaId}`),
  create: (agendaData: any): Promise<AxiosResponse<any>> => APiAxios.post('agendas', agendaData),
  update: (agendaId: number, agendaData: any): Promise<AxiosResponse<any>> => APiAxios.put(`agendas/${agendaId}`, agendaData),
  delete: (agendaId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`agendas/${agendaId}`)
};

