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

export const coberturas = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('coberturas'),
  getById: (coberturasId: number): Promise<AxiosResponse<any>> => APiAxios.get(`coberturas/${coberturasId}`),
  create: (coberturasData: any): Promise<AxiosResponse<any>> => APiAxios.post('coberturas', coberturasData),
  update: (coberturasUpdateId: number, coberturasData: any): Promise<AxiosResponse<any>> => APiAxios.put(`coberturas/${coberturasUpdateId}`, coberturasData),
  delete: (coberturasdeleteId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`coberturas/${coberturasdeleteId}`)
};
export const coberturaImagens = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('coberturasImg'),
  getById: (coberturaImagemId: number): Promise<AxiosResponse<any>> => APiAxios.get(`coberturasImg/${coberturaImagemId}`),
  create: (coberturaImagemData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.post('coberturasImg', coberturaImagemData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  update: (coberturaImagemId: number, coberturaImagemData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`coberturasImg/${coberturaImagemId}`, coberturaImagemData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: (coberturaImagemId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`coberturasImg/${coberturaImagemId}`)
};






