import { useEffect, useState } from "react";
import { Iagenda } from "../../interfaces/agendas";
import { AgendaDados, BannerPhotos } from "../../servers/apiAxio";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useFilteredImages } from "../imageDimensions/imageDimensions";
import imgAgenda from "../../img/agenda1.png";
import moment from "moment";
import "moment/locale/pt-br";
import "./Agenda.css";

const Agenda = () => {
  const navigate = useNavigate();
  const [agendas, setAgendas] = useState<Iagenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);

  const [closestAgendaIndex, setClosestAgendaIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, bannerResponse] = await Promise.all([
          AgendaDados.getAll(),
          BannerPhotos.getAll(),
        ]);
        const urls = bannerResponse.data.map((banner: any) => banner.url);
        setBannerUrls(urls);

        const currentDate = moment().startOf("day");

        const filteredAgendas = response.data
          .filter((agenda: Iagenda) =>
            moment(agenda.data).startOf("day").isSameOrAfter(currentDate)
          )
          .sort((a: Iagenda, b: Iagenda) => moment(a.data).diff(moment(b.data)))
          .slice(0, 4);

        setAgendas(filteredAgendas);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calcular o índice da agenda mais próxima assim que as agendas forem carregadas
    if (agendas.length > 0) {
      const index = agendas.reduce((closestIndex, agenda, index) => {
        const agendaMoment = moment(agenda.data);
        const closestMoment =
          closestIndex === -1 ? null : moment(agendas[closestIndex].data);

        if (!closestMoment || agendaMoment.isBefore(closestMoment)) {
          return index;
        }
        return closestIndex;
      }, -1);

      setClosestAgendaIndex(index);
    }
  }, [agendas]); // Reagir sempre que as agendas mudarem

  const getAgendaClass = (
    agendaDate: Date | string | null | undefined,
    isClosest: boolean
  ): string => {
    if (!agendaDate) return "highlight-green";

    const agendaMoment = moment(agendaDate).startOf("day");
    const currentMoment = moment().startOf("day");

    if (isClosest) {
      return "highlight-blue"; // Classe para a agenda mais próxima
    }

    if (agendaMoment.isSame(currentMoment)) {
      return "highlight-red";
    } else if (
      agendaMoment.isSameOrBefore(currentMoment.clone().add(1, "day"))
    ) {
      return "highlight-yellow";
    } else {
      return "highlight-green";
    }
  };

  // Função para lidar com o clique nos botões
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const buttonIndex = parseInt(
      e.currentTarget.getAttribute("data-bs-slide-to") || "0"
    );
    setSelectedButtonIndex(buttonIndex);
  };

  // useEffect para aplicar a classe 'selecte' ao botão inicial
  useEffect(() => {
    const buttons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll<HTMLButtonElement>(".EntBtn");
    buttons.forEach((button: HTMLButtonElement, index: number) => {
      button.classList.toggle("selecte", index === selectedButtonIndex);
    });
  }, [selectedButtonIndex]);

  const handleAgendaClick = (agendaSlug: string) => {
    navigate(`/agendas/${agendaSlug}`);
  };

  const obterDiaEMes = (data: Date | string | null | undefined): string => {
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    if (!data) return "Data inválida";

    const momentoData = moment(data);

    const mes = meses[momentoData.month()]; // Obtém o nome do mês

    return `${mes}`;
  };
  const sortedData = agendas
    .filter((photo) => photo.data)
    .sort((a, b) => {
      const dateA = moment(a.data);
      const dateB = moment(b.data);
      return dateB.diff(dateA);
    });

  const RowDataNoticias = sortedData.slice(1, 4);
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const { filteredImages } = useFilteredImages(bannerUrls, 500);
  const limitedFilteredImages = filteredImages.slice(0, 4);

  return (
    <>
      <div className="carousel slide carouselExampleIndicators">
        <div className="div-flex">
          <div className="carousel slide carouselExampleCaptions">
            <div className="carousel-indicato">
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="0"
                className={`EntBtn ${
                  selectedButtonIndex === 0 ? "selecte" : ""
                }`}
                aria-current="true"
                aria-label="Slide 1"
                onClick={handleClick}
              >
                <p className="color"></p>
              </button>
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                className={`EntBtn ${
                  selectedButtonIndex === 1 ? "selecte" : ""
                }`}
                onClick={handleClick}
              ></button>
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                className={`EntBtn ${
                  selectedButtonIndex === 2 ? "selecte" : ""
                }`}
                onClick={handleClick}
              ></button>
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
                className={`EntBtn ${
                  selectedButtonIndex === 3 ? "selecte" : ""
                }`}
                onClick={handleClick}
              ></button>
            </div>{" "}
            <div className="carousel-inner">
              {limitedFilteredImages.map((url, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={url}
                    className="d-block w-100"
                    alt={`Banner ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target=".carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="buto1" aria-hidden="true">
                <FaAngleLeft />
              </span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target=".carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="buto2" aria-hidden="true">
                <FaAngleRight />
              </span>
            </button>
          </div>
          <div id="agenda-section" className="agendas AGENDA">
            <div className="linha">
              <h3>AGENDA</h3>
              <img src={imgAgenda} alt="" />
            </div>
            <div className="cont">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                agendas.map((agenda, index) => {
                  const isClosest = index === closestAgendaIndex; // Verifica se é a agenda mais próxima
                  const dateClass = getAgendaClass(agenda.data, isClosest); // Passa o segundo argumento
                  // Usando a função formatarData para formatar a data da agenda
                  const nomeDoDia = obterDiaEMes(agenda.data);
                  return (
                    <div
                      className={`list lista ${
                        isClosest ? "highlight-blue" : ""
                      }`}
                      key={agenda.id}
                      onClick={() => handleAgendaClick(agenda.slug)}
                    >
                      <div className={`LIST-CALE cale ${dateClass}`}>
                        <div>{nomeDoDia}</div>
                        <div>{moment(agenda.data).format("DD")}</div>
                      </div>
                      <div className="descricao_agenda">
                        <h6>{truncateText(agenda.nome, 50)}</h6>
                        <h5> {truncateText(agenda.descricao, 50)}</h5>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agenda;
