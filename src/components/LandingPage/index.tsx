import { faAnglesRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BarsClick } from "./utils/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBars, FaSearch, FaThumbsUp, FaTwitter } from "react-icons/fa";
import Agenda from "../Agenda";
import Anucio from "../Anucio";
import Coberturas from "../Coberturas";
import GataBuritiVip from "../Gataburiti";
import Nav from "../Nav";
import Noticias from "../Noticias";
import Rodape from "../Rodape";
import Visible from "../pageAnucios";
import fecebook from "../../img/fecebokk.png";
import logo from "../../img/logo.png";
import pontoVip from "../../img/pontos-vip.png";
import imgHeader from "../../img/web-desig.jpg";
import youTube from "../../img/you-tube.jpg";
import "./styles.css";
import { PageMais } from "../PageMais/PageMais";
import { Link, Outlet, useLocation } from "react-router-dom";
import Pageanucios from "../pageAnucios2";

function LandingPage() {
  const location = useLocation();
  return (
    <>
      <header className="img_header">
        <img src={imgHeader} alt="" />
      </header>
      <div className="container containerCpl">
        <div className="min_nav">
          <div className="about">
            <span>Quem samos</span>
            <span>Nossa equipe</span>
            <span>Controle</span>
          </div>

          <div className="img_min_nav">
            <div className="imagem">
              <div className="img imgFecebook">
                <a href="#">
                  <img src={fecebook} alt="" />
                </a>
              </div>

              <div className="img imgYoutube">
                <a href="#">
                  <img src={youTube} alt="" />
                </a>
              </div>

              <div className="img imgTwiter">
                <a href="#">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
              </div>
            </div>

            <div className="min_Buriti">
              <div>
                <img src={pontoVip} alt="" />
              </div>
              <h3>
                Buriti Vip <span>no face</span>
              </h3>
              <button>
                {" "}
                <i>
                  <FaThumbsUp />
                </i>{" "}
                Curtir
              </button>
              <div>
                <span>60</span>
              </div>
            </div>
          </div>
        </div>

        <div className="logo_Buriti">
          <div className="logo">
            <img src={logo} alt="" />

            <span>O maior portal de eventos de Buriticupu-MA</span>

            <div className="input-group flex-nowrap button-usename">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="encotre o que deseja..."
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />

              <button>BUSCAR</button>
            </div>
            <i className="bars" onClick={BarsClick}>
              <FaBars />
            </i>
          </div>
        </div>
      </div>

      <div className="div-mobile" id="div-mobile">
        <p className="Xmark">
          <FontAwesomeIcon icon={faXmark} />
        </p>
        <nav className="nav_mobile">
          <ul>
            <li>
              <Link to="">
                <FontAwesomeIcon icon={faAnglesRight} /> COBERTURAS
              </Link>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faAnglesRight} /> AGENDA
              </a>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faAnglesRight} /> PROMOÇÕES
              </a>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faAnglesRight} /> RECADOS
              </a>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faAnglesRight} /> ANUCIE
              </a>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faAnglesRight} /> FALE CONOSCO
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="row rowSlider">
        <div className="col-5"></div>
        <div className="col collTras"></div>
      </div>

      {/* Verifica se está na rota "mais" */}
      <div className="container contNet">
        <>
          <Nav />
          <Agenda />
          <Coberturas />
          <Anucio />
          <Noticias />
          <Visible />
          <GataBuritiVip />
          <Pageanucios />
        </>
      </div>

      <Rodape />
    </>
  );
}

export default LandingPage;
