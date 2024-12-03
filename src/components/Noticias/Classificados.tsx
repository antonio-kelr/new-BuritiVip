import { useEffect, useState } from "react";
import imgauzte from "../../img/desig-5.png";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaPlay, FaPlus } from "react-icons/fa";
import { Classificadoss } from "../../interfaces";
import { ClassificadosAxios } from "../../servers";
import moment from "moment";
import { Link } from "react-router-dom";

const Classificados = () => {
  const [classificado, setClassificado] = useState<Classificadoss[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classificadosResponse] = await Promise.all([
          ClassificadosAxios.getAll(),
        ]);

        setClassificado(classificadosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedData = classificado
    .filter((photo) => photo.data)
    .sort((a, b) => {
      const dateA = moment(a.data);
      const dateB = moment(b.data);
      return dateB.diff(dateA);
    });

  const RowDataclassificado = sortedData.slice(0, 1);

  return (
    <div className="col clasF">
      <div className="noti_PLus clasf">
        <h3>CLASSIFICADOS</h3>
        <img src={imgauzte} alt="" />

        <div className="link_not">
          <a href="">
            <i>
              <FaPlus />
            </i>
            <Link to="/classificados">mais anúcios</Link>
          </a>
        </div>
      </div>
      <div className="Coud_classf">
        <div className="Caoud_classf">
          <div className="clasf_moto">
            <a href="">
              <i>
                <FaPlay />
              </i>
              MOTO
            </a>
          </div>
          {RowDataclassificado.map((Data) => (
            <div key={Data.id}>
              <div>
                {Data.classificadoImg && Data.classificadoImg.length > 0 ? (
                  <img
                    src={Data.classificadoImg[0].url}
                    alt={Data.classificadoImg[0].titulo}
                  />
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className="text_clssf">
                <h3>{Data.titulo}</h3>
                <h3>
                  {Data.descricao}
                  {""}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="clear-btn">
          <button>CRIE O SEU ANÚCIO</button>
          <button className="arrow">
            PRÓXIMA OFERTA
            <i>
              <FontAwesomeIcon icon={faRightLong} />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classificados;
