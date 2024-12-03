import { BiCaretRight } from "react-icons/bi";
import ImagemCobertura from "../.././../../../public/coberturas.png";
import "./maisRecados.css";
import { useEffect, useState } from "react";
import { Irecados } from "../../../../interfaces/Recados";
import { RecadosServer } from "../../../../servers";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const MaisRecados = () => {
  const [data, setData] = useState<Irecados[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coberturasData } = await RecadosServer.getAll();
        setData(coberturasData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleNoticiasClick = (slug: string) => {
    navigate(`/recados/detalhe/${slug}`);
  };
  const isDetailRoute = location.pathname.includes("/recados/detalhe");

  if (!data.length) return null;

  return (
    <div className="recados_container">
      <div className="agenda recado">
        <span>RÉCADOS</span>
        <img src={ImagemCobertura} alt="cobertura" />
      </div>
      <div className="recado_container">
        <Outlet />
        

        {!isDetailRoute && (
          <div className="recados_Lista">
            <span className="title_recados">RÉCADOS</span>
            {data.map((item, index) => (
              <div key={index} onClick={() => handleNoticiasClick(item.slug)}>
                <span>{item.nome || "Título não disponível"}</span>
                <span>{item.mensagem || "Descrição não disponível"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaisRecados;
