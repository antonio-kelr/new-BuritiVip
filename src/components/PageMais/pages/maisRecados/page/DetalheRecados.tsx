import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Irecados } from "../../../../../interfaces/Recados";
import { useEffect, useState } from "react";
import { RecadosServer } from "../../../../../servers";
import { BiCaretRight } from "react-icons/bi";

const DetalheRecados = () => {
  const { slug } = useParams(); // Capturando o slug da URL
  const [data, setData] = useState<Irecados[]>([]);
  const [recado, setrecado] = useState<Irecados | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coberturasData } = await RecadosServer.getAll();
        setData(coberturasData);

        // Verificar se o slug existe e definir a notícia correspondente como selecionada
        if (slug) {
          const noticiaEncontrada = coberturasData.find(
            (recado: Irecados) => recado.slug === slug
          );
          if (noticiaEncontrada) {
            setrecado(noticiaEncontrada); // Define a notícia encontrada como selecionada
          } else {
            setrecado(coberturasData[0]); // Se o slug não for encontrado, exibe a primeira notícia
          }
        } else {
          setrecado(coberturasData[0]); // Caso não tenha slug, exibe a primeira notícia
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, [slug]); // Adiciona slug como dependência para refazer a busca quando o slug mudar

  const handleNoticiasClick = (slug: string) => {
    navigate(`/recados/detalhe/${slug}`);
  };

  if (!recado) {
    return <p>Carregando notícia...</p>;
  }

  return (
    <>
      <div className="cont_recado">
        <section className="sention_recados">
          <nav className="nav_recados">
            <ul>
              <li>
                <Link to="/">Início</Link>
              </li>
              <i>
                <BiCaretRight />
              </i>
              <li>
                <Link to="/recados">Récados</Link>
              </li>
            </ul>
          </nav>
        </section>

        <div className="container_icones">
          <div className="Rowdados">
            <div className="detalhe_dados_recados">
              <h6>
                Nome: <strong>{recado.nome || "Nome não disponível"}</strong>
              </h6>
              <h6>
                telefone:{" "}
                <strong>{recado.telefone || "Telefone não disponível"}</strong>
              </h6>
              <h6>
                Email: <strong>{recado.email || "Email não disponível"}</strong>
              </h6>
              <h6 className="descrition_recado">
                {recado.mensagem || "Mensagem  não disponível"}
              </h6>
            </div>

            <div className="recados_Lista">
              <span className="title_recados">RÉCADOS ANTERIORES</span>
              {data.map((item, index) => (
                <div key={index} onClick={() => handleNoticiasClick(item.slug)}>
                  <span>{item.nome || "Título não disponível"}</span>
                  <span>{item.mensagem || "Descrição não disponível"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalheRecados;
