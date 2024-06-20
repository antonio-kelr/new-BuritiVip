import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import notFOud from "../../img/404-error-page-examples-best.webp";
import "./index.css";
const NotFound = () => {
  return (
    <div className="not_foud">
      <img src={notFOud} className="photo" />
      <Link to="/">
        <Button label="Retornar ao site" severity="warning" raised />
      </Link>
    </div>
  );
};

export default NotFound;
