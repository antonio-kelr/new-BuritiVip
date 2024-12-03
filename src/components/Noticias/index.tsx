import { FaPlus } from "react-icons/fa";
import imgauzte from "../../img/desig-5.png";
import "./Noticias.css";
import Classificados from "./Classificados";
import { useEffect, useState } from "react";
import moment from "moment";
import { INoticias } from "../../interfaces/Noticias";
import { NoticiasData } from "../../servers";
import { useNavigate } from "react-router-dom";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticias[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticiassResponse] = await Promise.all([NoticiasData.getAll()]);

        setNoticias(noticiassResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNoticiasClick = (slug: string) => {
    navigate(`/noticias/detalhe/${slug}`);
  };

  const sortedData = noticias
    .filter((photo) => photo.data)
    .sort((a, b) => {
      const dateA = moment(a.data);
      const dateB = moment(b.data);
      return dateB.diff(dateA);
    });

  const RowDataNoticias = sortedData.slice(1, 4);
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) : text;

  return (
    <>
      <div className="Noticias">
        <div className="row row_items">
          <div className="col-7 not">
            <div className="noti_PLus notis">
              <h3>NOTÍCIAS</h3>
              <img src={imgauzte} alt="Desenho de notícias" />

              <div className="link_not">
                <a href="#">
                  <i>
                    <FaPlus />
                  </i>
                  <a href="/noticias"> mais notícias</a>
                </a>
              </div>
            </div>

            <div className="padii">
              {sortedData.length > 0 && (
                <div
                  onClick={() => handleNoticiasClick(sortedData[0].slug)}
                  className="noticia_dataAtual"
                >
                  <img src={sortedData[0].url} alt="Imagem de destaque" />
                  <div className="container_dados">
                    <div className="data_noticias">
                      <span>Brasil</span>
                      <span>
                        {moment(sortedData[0].data).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <h1>{sortedData[0].titulo}</h1>
                    <h1 className="descricao">{sortedData[0].descricao}</h1>
                  </div>
                </div>
              )}

              {RowDataNoticias.map((item, index) => (
                <div key={index} className="Coud_Not">
                  <div className="Acad_not">
                    <div
                      onClick={() => handleNoticiasClick(item.slug)}
                      className="text_not"
                    >
                      <div>
                        <span>Maranhão</span>
                        <span>{moment(item.data).format("DD/MM/YYYY")}</span>
                      </div>
                      <h3>{item.titulo}</h3>
                      <h3 className="dencriotion_noticias">
                        {truncateText(item.descricao, 90)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Classificados />
        </div>
      </div>{" "}
    </>
  );
};

export default Noticias;
