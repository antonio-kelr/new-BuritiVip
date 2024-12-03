import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { AdminClick } from "./utils/index";
import "./AdminLayout.css";
import { Button } from "primereact/button";

const AdminLayout = () => {
  const items = [{ label: "Home" }];
  const home = { icon: "pi pi-home", url: "/admin" };

  const [value, setValue] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    <Navigate to="/admin/login" />;
    document.location.reload();

  };

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
                <Link className="ulpricioal redr" to="/admin">
                  Home
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/banners">
                Banners
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/anucios">
                Anucios
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/agendas">
                  Agendas
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/coberturas">
                  Coberturas
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/Classificados">
                  Classificados
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/recados">
                  Recados
                </Link>
              </li>
              <li>
                <Link className="redr" to="/admin/noticias">
                  Noticias
                </Link>
              </li>
              <li>
                <Link className="redr" to="/">
                  Ir para o site
                </Link>
              </li>
              <li className="Logout">
                <Button onClick={handleLogout} label="Logout" />
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
              <span
                className="icone-right pi pi-align-right"
                onClick={AdminClick}
              ></span>
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
