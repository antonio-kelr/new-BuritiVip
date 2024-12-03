import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoberturasAxios } from "../../../../../servers";
import { ICobertura } from "../../../../../interfaces";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BiCaretRight } from "react-icons/bi";

const DetalheCobertura = () => {
  const { slug } = useParams();
  const [cobertura, setCobertura] = useState<ICobertura | null>(null);

  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 4,
    },
    {
      breakpoint: "575px",
      numVisible: 4,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coberturasData } = await CoberturasAxios.getAll();
        const coberturaEncontrada = coberturasData.find(
          (cobertura: ICobertura) => cobertura.slug === slug
        );
        setCobertura(coberturaEncontrada);
      } catch (error) {
        console.error("Erro ao buscar cobertura:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!cobertura) return null;

  const itemTemplate = (item: any) => (
    <div className="container_Imagen">
      <img
        src={item.url}
        alt={item.titulo || "Imagem"}
        style={{ width: "100%" }}
        className="img_cobertura"
      />
      <div className="mentions-Images">
        <span>
          <span>2/25 </span>- Vista do Pátio
        </span>
      </div>
    </div>
  );

  const thumbnailTemplate = (item: any) => {
    return (
      <img
        src={item.url}
        alt={item.alt}
       className="coberturas_img"
      />
    );
  };

  return (
    <div>
      <div className="card card_gallery">
        <header>
          <nav>
            <ul>
              <li>
              <Link to='/'>Início</Link>
              </li>
              <i>
                <BiCaretRight />
              </i>
              <li>
                <Link to="/coberturas"> Coberturas</Link>
              </li>
            </ul>
          </nav>
          <h1>{cobertura.titulo}</h1>
          <div>
            <span>
              <strong>Local:</strong> {cobertura.local}
            </span>
            <span>
              <strong>Fotógrafo:</strong> {cobertura.fotografo}
            </span>
          </div>
        </header>
        <div className="cintainer_gallery">
          <Galleria
            value={cobertura.coberturaImg}
            className="Galleria"
            responsiveOptions={responsiveOptions}
            numVisible={4}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />{" "}
          <div className="cobertura_detalhes">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalheCobertura;
