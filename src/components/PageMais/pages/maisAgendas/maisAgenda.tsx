import { BiCaretRight } from "react-icons/bi";
import ImagemCobertura from "../.././../../../public/coberturas.png";
import "./maisAgenda.css";
import { useEffect, useState } from "react";
import { AgendaDados } from "../../../../servers";
import { Link, useParams } from "react-router-dom";
import { Iagenda } from "../../../../interfaces";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

const MaisAgenda = () => {
  const { slug } = useParams(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Iagenda[]>([]);
  const [groupedData, setGroupedData] = useState<{ [key: string]: Iagenda[] }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coberturasData } = await AgendaDados.getAll();
        console.log(coberturasData);

        const sortedData = coberturasData.sort((a: any, b: any) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          const today = new Date();
          return (
            Math.abs(dataA.getTime() - today.getTime()) -
            Math.abs(dataB.getTime() - today.getTime())
          );
        });

        setData(sortedData);
        const grouped = agruparPorData(sortedData);
        setGroupedData(grouped);

        
        // Se um ID foi fornecido, busca a agenda correspondente
        if (slug) {
          const agendaFound = sortedData.find(
            
            (agenda: Iagenda) => agenda.slug.toString() === slug
          );

          // Se a agenda foi encontrada, mostra todas as agendas da mesma data
          if (agendaFound) {
            const dataAgenda = moment(agendaFound.data).format("YYYY-MM-DD");
            const index = Object.keys(grouped).indexOf(dataAgenda);
            if (index >= 0) {
              setCurrentIndex(index);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, [slug]);

  const agruparPorData = (dados: Iagenda[]) => {
    return dados.reduce((acc: { [key: string]: Iagenda[] }, item: Iagenda) => {
      const dataFormatada = moment(item.data).format("YYYY-MM-DD");
      if (!acc[dataFormatada]) {
        acc[dataFormatada] = [];
      }
      acc[dataFormatada].push(item);
      return acc;
    }, {});
  };
  // Função para encontrar a data mais próxima da data atual
  const encontrarDataMaisProxima = () => {
    const hoje = moment().startOf("day"); // Considera apenas a data, sem horas
    let menorDiferenca = Infinity;
    let dataMaisProxima = null;
  
    // Itera sobre as agendas para encontrar a data futura mais próxima
    Object.keys(groupedData).forEach((data) => {
      const dataAgenda = moment(data).startOf("day");
      
      // Verifica se a data da agenda é no futuro (ou igual a hoje)
      if (dataAgenda.isSameOrAfter(hoje)) {
        const diff = dataAgenda.diff(hoje, "days"); // Diferença em dias (considerando apenas o futuro)
  
        if (diff < menorDiferenca) {
          menorDiferenca = diff;
          dataMaisProxima = dataAgenda.format("YYYY-MM-DD"); // Armazena no formato desejado
        }
      }
    });
  
    return dataMaisProxima;
  };
  
  const dataMaisProxima = encontrarDataMaisProxima(); // Obtém a data mais próxima
    console.log(dataMaisProxima);
  

  const nextDate = () => {
    if (currentIndex < Object.keys(groupedData).length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  const prevDate = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const formatarData = (data: string) => {
    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const momento = moment(data).locale("pt-br");
    const diaSemana = diasDaSemana[momento.day()];
    const dataFormatada = momento.format("DD/MM");
    return `${diaSemana}, ${dataFormatada}`;
  };

  const datasUnicas = Object.keys(groupedData);
  if (!data.length) {
    return <p>Carregando...</p>;
  }

  const dataAtual = datasUnicas[currentIndex];
  const agendasDoDia = groupedData[dataAtual];

  return (
    <div className="container_agenda">
      <div className="agenda">
        <span>AGENDA</span>
        <img src={ImagemCobertura} alt="cobertura" />
      </div>
      <nav className="nav_agenda">
        <ul>
          <li>
          <Link to='/'>Início</Link>
          </li>
          <i>
            <BiCaretRight />
          </i>
          <li>Agenda</li>
        </ul>
      </nav>
      <div className="lista_data">
        <div className="p-galleria-thumbnail-container p_galleria">
          <button
            className="pi pi-chevron-left"
            type="button"
            aria-label="Previous Page"
            onClick={prevDate}
            disabled={currentIndex === 0}
          ></button>

          <div className="lista_datas">
            {datasUnicas.map((data, index) => (
              <div
                key={index}
                className={`data-item ${index === currentIndex ? "active" : "" }`
              }onClick={() => {setCurrentIndex(index)}}
              >
                {formatarData(data)}
              </div>
            ))}
          </div>

          <button
            className="pi pi-chevron-right"
            type="button"
            aria-label="Next Page"
            onClick={nextDate}
            disabled={currentIndex === datasUnicas.length - 1}
          ></button>
        </div>
      </div>

      <div className="detalhes_agenda">
  {agendasDoDia.length > 0 ? (
    agendasDoDia.map((item: Iagenda, index: number) => {
      const dataFormatada = moment(item.data).format("YYYY-MM-DD");
      const dataSelecionada = datasUnicas[currentIndex]; // Obtém a data da data-item clicada

      return (
        <div
          key={index}
          className={`agenda_item`} 
          onClick={() => console.log(`Agenda: ${item.nome}`)}
        >
          <img src={item.url} alt={`Imagem da agenda: ${item.nome}`} />
          <div className={`agenda_info`}>
            {/* Aplica uma classe condicional à data clicada */}
            <span
              className={dataFormatada === dataSelecionada ? "data-selecionada" : ""}
            >
              {moment(item.data).format("DD/MM/YYYY")}
            </span>
            <h2>{item.nome}</h2>
            <p>{item.descricao}</p>
          </div>
        </div>
      );
    })
  ) : (
    <p>Nenhuma agenda disponível para esta data.</p>
  )}
</div>
    </div>
  );
};

export default MaisAgenda;
