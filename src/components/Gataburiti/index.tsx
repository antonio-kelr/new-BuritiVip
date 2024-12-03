import { FaPlay, FaPlus } from "react-icons/fa";
import imgDAvid from "../../img/david.jpg";
import imgauzte from "../../img/desig-5.png";
import imgBolha from "../../img/msg-desig-4.png";
import imgGata from "../../img/photo-gata.jpg";
import Recados from "./Recados";
import "./GataBuritiVip.css";

const GataBuritiVip = () => {
  return (
    <div className="row-gatas">
      <div className="col-3 img_items whidt">
        <div className="noti_PLus concert_content dj_img">
          <h3>TOP DJ</h3>
          <img src={imgauzte} alt="" />

          <div className="link_not concert guetta">
            <a href="">
              <i>
                <FaPlus />
              </i>
              <span> DJs</span>
            </a>
          </div>
        </div>
        <div className="David">
          <div className="img_item">
            <img src={imgDAvid} alt="" />

            <h3>David Guetta</h3>
            <div>
              <h6>
                Legal, sincera, divertida, Timida, Sorridente, alegre,amiga
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col img_items">
        <div className="noti_PLus concert_content cat">
          <h3>GATA BURITIVIP</h3>
          <img src={imgauzte} alt="" />

          <div className="link_not concert">
            <a href="">
              <i>
                <FaPlus />
              </i>
              <span> mais gatas</span>
            </a>
          </div>
        </div>
        <div className="David cat_item">
          <div className="img_gata">
            <img src={imgGata} alt="" />

            <div className="img_bolha">
              <div className="text_cat">
                <h1>Daniela Saraiva</h1>
                <h6>
                  Legal, sincera, divertida, Timida, Sorridente, alegre,amiga
                </h6>
                <button className="button_cout">
                  <i>
                    <FaPlay />
                  </i>
                  conheça a gata
                </button>
              </div>
              <img src={imgBolha} alt="" />
              <div className="anucio_cat">
                <span>Quer ser a proxima gata?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Recados></Recados>
    </div>
  );
};

export default GataBuritiVip;
