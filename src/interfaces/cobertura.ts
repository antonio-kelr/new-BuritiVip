export interface ICobertura {
  id: number;
  titulo: string;
  local: string;
  fotografo:string;
  data?: Date | null;
  slug:string
  descricao: string;
  coberturaImg?: ICoberturaImagem[];
}

export interface ICoberturaImagem {
  id: number;
  titulo: string;
  url: string;
  cobertura_id: number;
}
