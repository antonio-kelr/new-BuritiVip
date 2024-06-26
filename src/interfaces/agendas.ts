 /*interface da Agendas*/ 
export interface Iagenda {
    id: number;
    nome: string;
    data?: Date | null; 
    descricao: string
}

export  const initialAgenda: Iagenda = {
    id: 0,
    nome: "",
    data: null,
    descricao: "",
  };



