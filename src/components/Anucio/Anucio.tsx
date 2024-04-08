import imgAnucio from "../../img/desing-3.png";
import "./Anucio.css";
const Anucio = () => {
  return (
    <div className="anucio">
      <div className="row linhaRow">
        <div className="col anucio_img">
          <img src={imgAnucio} alt="" />
        </div>

        <div className="col-3 bg-danger"></div>
      </div>
    </div>
  );
};

export default Anucio;
