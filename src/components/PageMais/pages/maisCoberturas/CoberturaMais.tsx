import { useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router-dom"; // Import useParams
import { CoberturasAxios } from "../../../../servers";
import { ICobertura} from "../../../../interfaces";
import ImagemCobertura from "../.././../../../public/coberturas.png";
import "./coberturaMaIs.css";
import moment from "moment";

const CoberturaMais = () => {
  const [data, setData] = useState<ICobertura[]>([]);
  const navigate = useNavigate();



  const redirectToDetails = (slug:string) => {
    navigate(`/coberturas/detalhe/${slug}`);
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coberturasResponse] = await Promise.all([
          CoberturasAxios.getAll(),
        ]);

        setData(coberturasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card_cobertura">
      <div className="cobertura">
        <span>COBERTURAS</span>
        <img src={ImagemCobertura} alt="cobertura" />
      </div>
      <div className="cobertura_container">
      <Outlet /> 
        <div className="photo_cobetrs cobertura_wrap">
          {data.map((photo) => (
            <div
              key={photo.id}
              className={`img imagens cobertura_Imagem cobertura_card ${photo.id}`}
            >
              {photo.coberturaImg && photo.coberturaImg.length > 0 ? (
                 <img
                 src={photo.coberturaImg[0].url}
                 onClick={() => redirectToDetails(photo.slug)} // Redireciona ao clicar
                 alt={photo.coberturaImg[0].titulo || "Imagem de Cobertura"}
               />
              ) : (
                <p>No images available</p>
              )}
              <span className="description">
                {truncateText(photo.descricao, 39)}
              </span>
              <div className="data-fts rowDato">
                <span>{moment(photo.data).format("DD/MM/YYYY")}</span>
                <span>
                  {photo.coberturaImg
                    ? `${photo.coberturaImg.length} fotos`
                    : "No photos"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoberturaMais;
