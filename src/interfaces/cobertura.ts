export interface ICobertura {
    id: number;
    titulo: string;
    data?: Date | null;
    descricao: string;
    coberturaImg?: ICoberturaImagem[]; // Adicione esta linha se `coberturaImg` deve estar presente
}

export interface ICoberturaImagem {
    id: number;
    titulo: string;
    url: string;
    cobertura_id: number;
}
