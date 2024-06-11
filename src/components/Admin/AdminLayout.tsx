import { useState } from "react";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { BreadCrumb } from 'primereact/breadcrumb';
import "./AdminLayout.css";

const AdminLayout = () => {
  const items = [{ label: 'Home' }];
  const home = { icon: 'pi pi-home', url: '/admin' }

  const [value, setValue] = useState("");

  return (
    <section>
      <div className="tables">
        <div className="data">
          <span>Painel Administrativo</span>
        </div>
        <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-6vm7vh"></hr>
        <ul>
          <li>
            <Link className="ulpricioal" to="/admin">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/agendas">Agendas</Link>
          </li>
          <li>
            <Link to="/admin/agendas">Coberturas</Link>
          </li>
          <li>
            <Link to="/admin/agendas">Classificados</Link>
          </li>
          <li>
            <Link to="/">Ir para o site</Link>
          </li>
        </ul>
      </div>
      <div className="tag_separetion">
        <nav className="nav_bar">
          <BreadCrumb model={items} home={home} />
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

export default AdminLayout;
