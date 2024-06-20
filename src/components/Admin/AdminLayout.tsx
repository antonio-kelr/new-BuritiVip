import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { AdminClick }  from './index'
import "./AdminLayout.css";

const AdminLayout = () => {
  const items = [{ label: "Home" }];
  const home = { icon: "pi pi-home", url: "/admin" };

  const [value, setValue] = useState("");

  return (
    <>
      <section>
        <div className="tables div-admin">
          <div className="tables_componets">
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
                <Link to="/admin/coberturas">Coberturas</Link>
              </li>
              <li>
                <Link to="/admin/classificados">Classificados</Link>
              </li>
              <li>
                <Link to="/">Ir para o site</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="tag_separetion">
          <nav className="nav_bar">
            <BreadCrumb model={items} home={home} />
            <div className="p-field">
              <InputText
                id="search"
                value={value}
                placeholder="Pesquisar"
                className="p-inputtext-lg"
                onChange={(e) => setValue(e.target.value)}
              />
              <span className="icone-right pi pi-align-right" onClick={AdminClick}></span>
            </div>
          </nav>
          <div className="upalod_componets">
            <Outlet /> {/* Isto renderizará as rotas filhas */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
