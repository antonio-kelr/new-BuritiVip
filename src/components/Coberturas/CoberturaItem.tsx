import React from "react";
import type { CoberturaItem } from '../../interfaces/cobertura';

export const fotosData: CoberturaItem[] = [
  {
    id: 1,
    URL: './src/img/img-cbtrs.webp',
    description: "Conquetel de lançamento do Forro fets",
    date: "13/05/2012",
    numeroFoto: '60 fotos',
  },

  {
    id: 2,
    URL: './src/img/img-cbtrs.webp',
    description: "Boate Live itz-Fetsta a Fantasia ll",
    date: "13/05/2012",
    numeroFoto: '50 fotos',
  },
  {
    id: 3,
    URL: './src/img/img-cbtrs.webp',
    description: "Carnaval de Buriticupu 2013-Primeiro dia",
    date: "13/05/2012",
    numeroFoto: '58 fotos',
  },
  {
    id: 4,
    URL: './src/img/img-cbtrs.webp',
    description: "Carnaval de Buriticupu 2013-Segundo dia",
    date: "13/05/2012",
    numeroFoto: '88 fotos',
  },
  {
    id: 5,
    URL: './src/img/img-cbtrs.webp',
    description: "Carnaval de Buriticupu 2013-Segundo dia",
    date: "13/05/2012",
    numeroFoto: '63 fotos',
  },
];




const CoberturaItem: React.FC<CoberturaItem> = ({
  URL,
  description,
  date,
  numeroFoto,
}) => {

  return (
    <div>
      <img src={URL} />
      <p>{description}</p>
      <span>{date}</span>
      <span>{numeroFoto}</span>
    </div>
  );
};

export default CoberturaItem;
