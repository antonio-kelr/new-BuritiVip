import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ClassificadosAxios } from "../../../../servers";
import "./classificacados.css";
import { Classificadoss} from "../../../../interfaces";
import { Outlet, useNavigate } from "react-router-dom";

const Classificacao = () => {
  const [classificados, setClassificados] = useState<Classificadoss[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    ClassificadosAxios.getAll()
      .then((response) => setClassificados(response.data))
      .catch((error) =>
        console.error("Erro ao carregar classificados: ", error)
      );
  }, []);

  const headelClikClassificados = (slug: string) => {
    navigate(`/classificados/detalhe/${slug}`)
  };

  const productTemplate = (classificado: Classificadoss) => {
    const imageUrl = classificado.classificadoImg?.length
      ? classificado.classificadoImg[0].url
      : "";

    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={imageUrl}
            alt={classificado.titulo}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{classificado.titulo}</h4>
          <h6 className="mt-0 mb-3">R${classificado.preco}</h6>
          <Tag value={classificado.estado} />
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button
              label="mais informação"
              onClick={() => headelClikClassificados(classificado.slug)}
              severity="info"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card_classificacao">
      <div className="classificacao">
        <span>CLASSIFICADOS</span>
        <img src="/coberturas.png" alt="cobertura" />
      </div>

      <Outlet />

      <div className="detalhes_classificacao">
        <div className="card card_container">
          <div className="grid-container">
            {classificados.map((classificado) => (
              <div className="grid-item" key={classificado.id}>
                {productTemplate(classificado)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classificacao;
