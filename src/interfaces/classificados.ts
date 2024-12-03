export interface Classificadoss {
  id: number;
  titulo: string;
  descricao: string;
  slug:string
  preco: number;
  telefone: string;
  cidade: string;
  data?: Date | null;
  email: string;
  estado: string;
  categoria: number;
  classificadoImg?: Classificadoimg[]
}


export interface Classificadoimg {
  id: number;
  titulo: string;
  descricao: string;
  url: string;
  classificado_id: number;
}

