import { useState } from "react";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./admin.css";

const admin = () => {
  const [value, setValue] = useState("");
  return (
    <section>
      <div className="tables">
        <div className="data">
          <span>Painel de dados</span>
        </div>
        <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-6vm7vh"></hr>
        <ul>
          <li>
            <Link className="ulpricioal" to="#">
              Painel
            </Link>
          </li>
          <li>
            <Link to="#">Tabelas</Link>
          </li>
          <li>
            <Link to="#">Perfil</Link>
          </li>
          <li>
            <Link to="#">Entrar</Link>
          </li>
          <li>
            <Link to="#">Escreva-se</Link>
          </li>
        </ul>
      </div>
      <div className="tag_separetion">
        <nav className="nav_bar">
          <div>
            <span className="pi pi-home" style={{ fontSize: "20px" }}>
              / admin
            </span>
          </div>
          <div className="p-field">
            <FloatLabel>
              <InputText
                id="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="search">Search here</label>
            </FloatLabel>
            <button className="buto_icone">
              <span className="pi pi-user"></span>
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default admin;
