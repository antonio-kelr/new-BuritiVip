import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCamera, FaImages, FaPlus, FaVideo } from "react-icons/fa";
import imgCObertua from "../../img/desig-5.png";
import "./Cobertura.css";
import { fotosData } from "./CoberturaItem";

const Coberturas = () => {
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
              <span> mais coberturas </span>
            </a>
          </div>

          <div className="text-ctt">
            <i>
              <FontAwesomeIcon icon={faMobileRetro} />
            </i>
            <span className="contratar">
              Contrate nossa equipe para fazer a cobertura do seu evento:
              <span>(98)3072-2012</span>
            </span>
            <span className="contratar-quie">
              contrate nossa equipe para fazer a cobertura do seu evento:{" "}
              <a href="">aqui</a>{" "}
            </span>
          </div>
        </div>

        <div className="photo_cobetrs">
          {fotosData.map((photo) => (
            <div key={photo.id} className={`img imagens${photo.id}`}>
              <img src={photo.URL}/>
              <span>{photo.description}</span>
              <div className="data-fts">
                <span>{photo.date}</span>
                <span>{photo.numeroFoto}</span>
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
