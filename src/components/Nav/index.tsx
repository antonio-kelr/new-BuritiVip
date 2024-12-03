import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Nav.css'
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
    
    <div className="row nav-bar">
          <div className="col-2"></div>
          <div className="col navs">
            <nav className="nav_uls">
              <ul className="ulss">
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={faAnglesRight} /> HOME
                  </Link>
                </li>
                <li>
                  <a href='/coberturas'>
                    <FontAwesomeIcon icon={faAnglesRight} /> COBERTURAS
                  </a>
                </li>
                <li>
                  <a href='/agendas'>
                    <FontAwesomeIcon icon={faAnglesRight} /> AGENDA
                  </a>
                </li>
                <li>
                  <a href="/noticias">
                    <FontAwesomeIcon icon={faAnglesRight} /> NOTICIAS
                  </a>
                </li>
                <li>
                  <a href='/recados'>
                    <FontAwesomeIcon icon={faAnglesRight} /> RECADOS
                  </a>
                </li>
                <li>
                  <a href='/classificados'>
                    <FontAwesomeIcon icon={faAnglesRight} /> ANUCIE
                  </a>
                </li>
                <li>
                  <a href="/faleconosco">
                    <FontAwesomeIcon icon={faAnglesRight} /> FALE CONOSCO
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      
    </>
  )
}

export default Nav
