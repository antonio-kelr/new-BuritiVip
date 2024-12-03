 /*interface da Agendas*/ 
export interface Iagenda {
    id: number;
    nome: string;
    url:string;
    slug:string
    data?: Date | null; 
    descricao: string
}

export  const initialAgenda: Iagenda = {
    id: 0,
    url:'',
    nome: "",
    slug: '',
    data: null,
    descricao: "",
  };



