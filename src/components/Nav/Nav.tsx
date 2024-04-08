import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Nav.css'
const Nav = () => {
  return (
    <>
    
    <div className="row nav-bar">
          <div className="col-2"></div>
          <div className="col navs">
            <nav className="nav_uls">
              <ul>
                <li>
                  <a href="#COBERTUA">
                    <FontAwesomeIcon icon={faAnglesRight} /> COBERTURAS
                  </a>
                </li>
                <li>
                  <a href="#AGENDA">
                    <FontAwesomeIcon icon={faAnglesRight} /> AGENDA
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faAnglesRight} /> PROMOÇÕES
                  </a>
                </li>
                <li>
                  <a href="#recados">
                    <FontAwesomeIcon icon={faAnglesRight} /> RECADOS
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faAnglesRight} /> ANUCIE
                  </a>
                </li>
                <li>
                  <a href="#">
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
