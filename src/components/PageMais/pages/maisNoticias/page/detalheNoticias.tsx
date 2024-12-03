import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { INoticias } from "../../../../../interfaces/Noticias";
import { NoticiasData } from "../../../../../servers";
import "moment/locale/pt";
import { BiCaretRight } from "react-icons/bi";
import moment from "moment";

const DetalheNoticias = () => {
  const { slug } = useParams(); // Capturando o slug da URL
  const [data, setData] = useState<INoticias[]>([]);
  const [noticiaSelecionada, setNoticiaSelecionada] =
    useState<INoticias | null>(null);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coberturasData } = await NoticiasData.getAll();
        setData(coberturasData);

        // Verificar se o slug existe e definir a notícia correspondente como selecionada
        if (slug) {
          const noticiaEncontrada = coberturasData.find(
            (noticia: INoticias) => noticia.slug === slug
          );
          if (noticiaEncontrada) {
            setNoticiaSelecionada(noticiaEncontrada); // Define a notícia encontrada como selecionada
          } else {
            setNoticiaSelecionada(coberturasData[0]); // Se o slug não for encontrado, exibe a primeira notícia
          }
        } else {
          setNoticiaSelecionada(coberturasData[0]); // Caso não tenha slug, exibe a primeira notícia
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, [slug]); // Adiciona slug como dependência para refazer a busca quando o slug mudar

  const obterDiaEMes = (data: Date | string | null | undefined): string => {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    if (!data) return "Data inválida";

    const dataObj = typeof data === "string" ? new Date(data) : data;

    if (isNaN(dataObj.getTime())) return "Data inválida";

    const dia = dataObj.getDate();
    const mes = meses[dataObj.getMonth()];
    const ano = dataObj.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
  };

  const handleNoticiasClick = (slug: string) => {
    navigate(`/noticias/detalhe/${slug}`)
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  if (!noticiaSelecionada) {
    return <p>Carregando notícia...</p>;
  }

  return (
    <>
      <nav className="nav_noticias">
        <ul>
          <li>
            <Link to="/">Inicial</Link>
          </li>
          <i>
            <BiCaretRight />
          </i>
          <li>
            <Link to="/noticias">Notícias</Link>
          </li>
          <i>
            <BiCaretRight />
          </i>
          <li style={{color: "#A9432D", fontWeight: 'bolder'}}>
          {noticiaSelecionada?.titulo || "Titulo não disponível"}
          </li>
        </ul>
      </nav>

      <div className="cont_noticia">
        <div className="container_detalhe_noticias">
          <img
            src={noticiaSelecionada.url}
            alt="Imagem da notícia selecionada"
          />
          <div className="icon-container icon_noticia">
            <div className="title_noticia">
              <div>
                <p>Buriticupu</p>
                <p>{obterDiaEMes(noticiaSelecionada?.data)}</p>
              </div>
              <h6>{noticiaSelecionada.titulo || "Título não disponível"}</h6>
            </div>
              <h6 style={{textAlign: 'justify'}}>{noticiaSelecionada.descricao || "Título não disponível"}</h6>
          </div>
        </div>

        {/* Lista de notícias anteriores */}
        <div className="noticias_anteriores">
          <span className="title_noticias">NOTÍCIAS ANTERIORES</span>
          {data.map((item, index) => (
            <div key={index} onClick={() => handleNoticiasClick(item.slug)}>
              <span>{moment(item.data).format("DD/MM/YYYY")}</span>
              <span>{item.titulo || "Título não disponível"}</span>
              <span>
                {truncateText(item.descricao, 90) || "Descrição não disponível"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetalheNoticias;
