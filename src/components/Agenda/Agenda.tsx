import { MouseEvent } from "react";
import imgAgenda from "../../img/agenda1.png";
import imgCarrosuel from "../../img/img-carrosuel.jpg";
import "./Agenda.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
const Agenda = () => {
  const handleClick = (e: MouseEvent): void => {
    const buttons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll<HTMLButtonElement>(".EntBtn");
    buttons.forEach((button: HTMLButtonElement) => {
      button.classList.remove("selecte");
    });

    const button: HTMLButtonElement = e.currentTarget as HTMLButtonElement;
    button.classList.add("selecte");
  };
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
                className="active EntBtn"
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
                className="EntBtn"
                onClick={handleClick}
              ></button>
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                className="EntBtn"
                onClick={handleClick}
              ></button>
              <button
                type="button"
                data-bs-target=".carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active EntBtn"
                aria-current="true"
                aria-label="Slide 1"
                onClick={handleClick}
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
              </div>

              <div className="carousel-item">
                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
              </div>

              <div className="carousel-item">
                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
              </div>
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
          <div className="agendas AGENDA">
            <div className="linha">
              <h3>AGENDA</h3>
              <img src={imgAgenda} alt="" />
            </div>
            <div className="cont">
              <div className="list lista">
                <div className="LIST-CALE cale">
                  <div>JUN</div>
                  <div>07</div>
                </div>
                <div>
                  <h5>Skol Sensation</h5>
                  <h5>Live ITZ</h5>
                </div>
              </div>
              <div className="list">
                <div className="LIST-CALE">
                  <div>AGO</div>
                  <div>12</div>
                </div>
                <div>
                  <h5>Maranhão Forro fest 2012</h5>
                  <h5>Parque de Esposicções</h5>
                </div>
              </div>
              <div className="list">
                <div className="LIST-CALE">
                  <div>AGO</div>
                  <div>12</div>
                </div>
                <div>
                  <h5>Maranhão Forro fest 2012</h5>
                  <h5>Parque de Esposicções</h5>
                </div>
              </div>
              <div className="list">
                <div className="LIST-CALE">
                  <div>SET</div>
                  <div>20</div>
                </div>
                <div>
                  <h5>Show jorge e Mateus</h5>
                  <h5>Parque de Esposicções</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agenda;
