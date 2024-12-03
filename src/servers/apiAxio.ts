import axios, { AxiosResponse } from 'axios';

export const APiAxios = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const usuarios = {
  login: (credentials: { email: string, senha: string }): Promise<AxiosResponse<any>> => APiAxios.post('usuarios/entrar', credentials),
};
export const BannerPhotos = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('banner'),
  create: (bannerphotos: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.post('banner', bannerphotos, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
},
  getById: (bannerId: number): Promise<AxiosResponse<any>> => APiAxios.get(`banner/${bannerId}`),

  update: (bannerId: number, bannerphotos: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`banner/${bannerId}`, bannerphotos, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
    delete: (bannerId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`banner/${bannerId}`)
};

export const AnuciosPhoto = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('anucios'),
  create: (anucio: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.post('anucios', anucio, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
},
  getById: (anucioId: number): Promise<AxiosResponse<any>> => APiAxios.get(`anucios/${anucioId}`),

  update: (anucioId: number, anucio: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`anucios/${anucioId}`, anucio, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
    delete: (anucioId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`anucios/${anucioId}`)
};


export const NoticiasData = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('noticias'),
  getById: (NoticiasImagemId: number): Promise<AxiosResponse<any>> => APiAxios.get(`noticias/${NoticiasImagemId}`),
  create: ( NoticiasData: FormData): Promise<AxiosResponse<any>> => {return APiAxios.post('noticias', NoticiasData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  update: (NoticiasImagemId: number, NoticiasData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`noticias/${NoticiasImagemId}`, NoticiasData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: (NoticiasImagemId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`noticias/${NoticiasImagemId}`),

  deleteImage: (filePath: string,  noticiaId:number): Promise<AxiosResponse<any>> => {
    return APiAxios.delete('noticias', {
      data: { filePath, noticiaId } 
    });
  }};


export const RecadosServer = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('recados'),
  create: (RecadoData: any): Promise<AxiosResponse<any>> => APiAxios.post('recados', RecadoData),
  update: (recadoId: number, RecadoData: any): Promise<AxiosResponse<any>> => APiAxios.put(`recados/${recadoId}`, RecadoData),
  delete: (RecadoId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`recados/${RecadoId}`)
};
export const ClassificadosAxios = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('classificados'),
  create: (classifcadoData: any): Promise<AxiosResponse<any>> => APiAxios.post('classificados', classifcadoData),
  update: (classificadoId: number, classificadoData: any): Promise<AxiosResponse<any>> => APiAxios.put(`classificados/${classificadoId}`, classificadoData),
  delete: (classificadoId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`classificados/${classificadoId}`)
};
export const Classificadosimg = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('classifcadoImgs'),
  getById: (classificadoImgId: number): Promise<AxiosResponse<any>> => APiAxios.get(`classifcadoImgs/${classificadoImgId}`),
  create: (classificadoImgData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.post('classifcadoImgs', classificadoImgData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  update: (classificadoImgId: number, classificadoImgData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`classifcadoImgs/${classificadoImgId}`, classificadoImgData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: (classificadoImgId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`classifcadoImgs/${classificadoImgId}`)
};

export const AgendaDados = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('agendas'),
  create: (agendaData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.post('agendas', agendaData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
},
  getById: (agendaId: number): Promise<AxiosResponse<any>> => APiAxios.get(`agendas/${agendaId}`),

  update: (agendaId: number, agendaData: FormData): Promise<AxiosResponse<any>> => {
    return APiAxios.put(`agendas/${agendaId}`, agendaData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
    delete: (agendaId: number): Promise<AxiosResponse<any>> => APiAxios.delete(`agendas/${agendaId}`)
};

export const CoberturasAxios  = {
  getAll: (): Promise<AxiosResponse<any>> => APiAxios.get('coberturas'),
  getBySlug: (slug: string): Promise<AxiosResponse<any>> => APiAxios.get(`coberturas/slug/${slug}`),
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






