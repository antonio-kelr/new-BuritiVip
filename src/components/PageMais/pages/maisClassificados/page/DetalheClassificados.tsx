import { useEffect, useState } from "react";
import { Galleria } from "primereact/galleria";
import { BiCaretRight } from "react-icons/bi";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlus, FaTwitter } from "react-icons/fa";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { ClassificadosAxios } from "../../../../../servers"; // Ajuste de importação para buscar os classificados
import { Classificadoss } from "../../../../../interfaces";

const DetalheClassificados = () => {
  const { slug } = useParams();
  const [selectedClassificado, setSelectedClassificado] = useState<Classificadoss | null>(null);
  const [images, setImages] = useState<
    {
      itemImageSrc: string;
      thumbnailImageSrc: string;
      alt: string;
      title: string;
    }[]
  >([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Função para buscar o classificado pelo slug
  useEffect(() => {
    const fetchClassificado = async () => {
      try {
        const response = await ClassificadosAxios.getAll(); // Buscar todos os classificados
        const classificados = response.data;

        // Filtrar o classificado pelo slug
        const classificado = classificados.find(
          (item: Classificadoss) => item.slug === slug
        );

        if (classificado) {
          setSelectedClassificado(classificado);

          // Preparando imagens para a galeria
          const galleryImages = classificado.classificadoImg.map((img: any) => ({
            itemImageSrc: img.url,
            thumbnailImageSrc: img.url,
            alt: img.titulo || "Imagem de Classificado",
            title: img.titulo || "Imagem",
          }));
          setImages(galleryImages);
        } else {
          console.error("Classificado não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar classificado:", error);
      }
    };

    fetchClassificado();
  }, [slug]);

  const itemTemplate = (item: { itemImageSrc?: string; alt?: string }) => (
    <div className="Imagen_classificacao">
      <img src={item?.itemImageSrc} alt={item?.alt} className="img-classificacao" />
    </div>
  );

  const thumbnailTemplate = (item: { thumbnailImageSrc?: string; alt?: string }) => (
    <img src={item?.thumbnailImageSrc} alt={item?.alt} className="img_classificacao" />
  );

  return (
    <div className="containerr">
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
              <Link to="/classificados">Classificados</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="detalhe">
        <div className="Galleria_Imagens">
          {images.length > 0 && (
            <Galleria
              value={images}
              className="Galleria_classificacao"
              numVisible={5}
              activeIndex={activeIndex}
              onItemChange={(e) => setActiveIndex(e.index)}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          )}
        </div>
        <div className="detalhe_dados">

          <p>
            <strong>Título:</strong> {selectedClassificado?.titulo}
          </p>
          <p>
            <strong>Preço:</strong> R${selectedClassificado?.preco}
          </p>
          <p>
            <strong>Telefone:</strong> {selectedClassificado?.telefone}
          </p>
          <p>
            <strong>Email:</strong> {selectedClassificado?.email}
          </p>
          <p>
            <strong>Estado:</strong> {selectedClassificado?.estado}
          </p>
          <p>
            <strong>Cidade:</strong> {selectedClassificado?.cidade}
          </p>
          <p>
            <strong>Descrição:</strong> {selectedClassificado?.descricao}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetalheClassificados;
