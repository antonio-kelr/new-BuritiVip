// Atualize a interface INoticias para incluir file
export interface INoticias {
  id: number;
  titulo: string;
  data?: Date | null;
  slug:string;
  url: string;
  descricao: string;
  file?: File; // Adiciona a propriedade file
}
