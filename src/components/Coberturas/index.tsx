import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCamera, FaImages, FaPlus, FaVideo } from "react-icons/fa";
import imgCObertua from "../../img/desig-5.png";
import "./Cobertura.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { CoberturasAxios } from "../../servers";
import { ICobertura } from "../../interfaces";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Coberturas = () => {
  const [cobertura, setCobertura] = useState<ICobertura[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coberturasResponse] = await Promise.all([
          CoberturasAxios.getAll(),
        ]);

        setCobertura(coberturasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort by date closest to the current date
  const sortedData = cobertura
    .filter((photo) => photo.data) // Ensure data is not null or undefined
    .sort((a, b) => {
      const dateA = moment(a.data);
      const dateB = moment(b.data);
      return dateB.diff(dateA); // Sort in descending order
    });

    const handleAgendaClick = (coberturaSlug: string)=> {
      navigate(`/coberturas/detalhe/${coberturaSlug}`);


    }

  // Limit the number of items to 6
  const displayedData = sortedData.slice(0, 6);
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <>
      <div className="COBERTUA">
        <div className="coberturas_logos">
          <div className="logo_cobertua">
            <h3>COBERTURAS</h3>
            <img src={imgCObertua} alt="" />
          </div>
          <div className="text_mais">
            <a href="">
              <i>
                <FaPlus />
              </i>
            <Link to="/coberturas">mais coberturas</Link>
            </a>
          </div>

          <div className="text-ctt">
            <i>
              <FontAwesomeIcon icon={faMobileRetro} />
            </i>
            <span className="contratar">
              Contrate nossa equipe para fazer a cobertura do seu evento:
              <span>(98)84158711</span>
            </span>
            <span className="contratar-quie">
              contrate nossa equipe para fazer a cobertura do seu evento:{" "}
              <a href="">aqui</a>{" "}
            </span>
          </div>
        </div>

        <div className="photo_cobetrs">
          {displayedData.map((photo) => (
            <div key={photo.id}
            onClick={() => handleAgendaClick(photo.slug)}
            className={`img card_coberturas imagens ${photo.id}`}
             >
              {photo.coberturaImg && photo.coberturaImg.length > 0 ? (
                <img
                  src={photo.coberturaImg[0].url}
                  alt={photo.coberturaImg[0].titulo}
                />
              ) : (
                <p>No images available</p>
              )}
              <p className="descrition_coberturas"> {truncateText(photo.descricao, 30)}</p>
              <div className="data-fts">
                <span>{moment(photo.data).format("DD/MM/YYYY")}</span>
                <span>
                  {photo.coberturaImg
                    ? `${photo.coberturaImg.length} fotos`
                    : "No photos"}
                </span>
              </div>
            </div>
          ))}

          <div className="imgs img imagems6">
            <div className="icons">
              <i>
                <FaCamera />
              </i>
              <span>Fotos</span>
            </div>
            <div className="icons">
              <i>
                <FaVideo />
              </i>
              <span>Videos</span>
            </div>
            <div className="icons">
              <i>
                <FaImages />
              </i>
              <span>Books</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coberturas;
