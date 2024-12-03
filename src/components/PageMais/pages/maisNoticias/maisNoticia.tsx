import "./noticias.css";
import ImagemCobertura from "../.././../../../public/coberturas.png";
import { useEffect, useState } from "react";
import { INoticias } from "../../../../interfaces/Noticias";
import { NoticiasData } from "../../../../servers";
import moment from "moment";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MaisNoticia = () => {
  const [data, setData] = useState<INoticias[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: noticiaData } = await NoticiasData.getAll();
        setData(noticiaData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleNoticiasClick = (slug: string) => {
    navigate(`/noticias/detalhe/${slug}`);
  };

  // Verifica se está na rota de detalhe para esconder a lista
  const isDetailRoute = location.pathname.includes("/noticias/detalhe");

  return (
    <div className="card_noticias">
      <div className="noticia">
        <span>NOTÍCIAS</span>
        <img src={ImagemCobertura} alt="cobertura" />
      </div>

      <section className="sention_noticia">
        <div className="noticias_container">
          <Outlet />

          {!isDetailRoute && (
            <div className="noticias_Listas">
              <span className="title_noticias">NOTÍCIAS</span>
              {data.map((item, index) => (
                <div
                  className="item_noticia"
                  key={index}
                  onClick={() => handleNoticiasClick(item.slug)}
                >
                  <div>
                    <img
                      src={item.url || "imagem_nao_disponivel.png"}
                      alt={item.titulo || "Imagem não disponível"}
                      style={{ width: "90px", height: "90px" }}
                    />
                  </div>
                  <div>
                    <span>{moment(item.data).format("DD/MM/YYYY")}</span>
                    <span>{item.titulo || "Título não disponível"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MaisNoticia;
