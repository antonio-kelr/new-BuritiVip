import './App.css'
import Agenda from './components/Agenda'
import Anucio from './components/Anucio'
import Rodape from './components/Rodape'
import Visible from './components/Visible'
import Coberturas from './components/Coberturas'
import Noticias from './components/Noticias'
import imgHeader from './img/web-desig.jpg'
import fecebook from './img/fecebokk.png'
import youTube from './img/you-tube.jpg'
import pontoVip from './img/pontos-vip.png'
import logo from './img/logo.png'
import { FaTwitter } from 'react-icons/fa'
import { FaThumbsUp } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import GataBuritiVip from './components/GataBuritiVip'
import { FaBars } from 'react-icons/fa'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



function App() {



  const BarsClick = () => {
    const divMobile: HTMLElement | null = document.getElementById('div-mobile')
    const Xmark: HTMLElement | null = document.querySelector('.Xmark');

    if (divMobile && Xmark) {
      Xmark.addEventListener('click', () => {
        divMobile.classList.remove('abri-menu');
      });
    }

    if (divMobile?.classList.contains('abri-menu')) {
      divMobile.classList.remove('abri-menu');

    } else {
      divMobile?.classList.add('abri-menu');
    }

    divMobile?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && divMobile.contains(event.target)) {
        divMobile.classList.remove('abri-menu');



      }
    });

  };

  return (
    <>
        <header id='img_header'>
          <img src={imgHeader} alt="" />

        </header>
        <div className='container' id='container'>
          <div id='min_nav'>
            <div className='about'>
              <span>Quem samos</span>
              <span>Nossa equipe</span>
              <span>Controle</span>
            </div>

            <div id='img_min_nav'>
              <div id='imagem'>
                <div className='img imgFecebook'>
                  <a href="#">
                    <img src={fecebook} alt="" />
                  </a>
                </div>

                <div className='img imgYoutube'>
                  <a href="#">
                    <img src={youTube} alt="" />
                  </a>
                </div>

                <div className='img imgTwiter'>
                  <a href="#">
                    <i>
                      <FaTwitter />
                    </i>
                  </a>
                </div>
              </div>

              <div id='min_Buriti'>
                <div>
                  <img src={pontoVip} alt="" />
                </div>
                <h3>Buriti Vip <span>no face</span></h3>
                <button> <i><FaThumbsUp /></i> Curtir</button>
                <div>
                  <span>60</span>
                </div>
              </div>
            </div>

          </div>

          <div className='logo_Buriti'>
            <div id='logo'>
              <img src={logo} alt="" />

              <span>O maior portal de eventos de Buriticupu-MA</span>

              <div className="input-group flex-nowrap" id='button-usename'>
                <span className="input-group-text" id="addon-wrapping">
                  <FaSearch />
                </span>
                <input type="text" className="form-control" placeholder="encotre o que deseja..." aria-label="Username" aria-describedby="addon-wrapping" />

                <button>BUSCAR</button>
              </div>
              <i id='bars' onClick={BarsClick}><FaBars /></i>

            </div>


          </div>

        </div>
        <div className='row' id='nav-bar'>
          <div className="col-3"></div>
          <div className="col" id='navs'>
            <nav id='nav_uls'>
              <ul>
                <li><a href="#COBERTUA"><FontAwesomeIcon icon={faAnglesRight} /> COBERTURAS</a></li>
                <li><a href="#AGENDA"><FontAwesomeIcon icon={faAnglesRight} /> AGENDA</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faAnglesRight} /> PROMOÇÕES</a></li>
                <li><a href="#recados"><FontAwesomeIcon icon={faAnglesRight} /> RECADOS</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faAnglesRight} /> ANUCIE</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faAnglesRight} /> FALE CONOSCO</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='div-mobile' id='div-mobile'>
          <p className='Xmark'><FontAwesomeIcon icon={faXmark} /></p>
          <nav id='nav_mobile'>
            <ul>
              <li><a href="#COBERTUA"><FontAwesomeIcon icon={faAnglesRight} /> COBERTURAS</a></li>
              <li><a href="#AGENDA"><FontAwesomeIcon icon={faAnglesRight} /> AGENDA</a></li>
              <li><a href=""><FontAwesomeIcon icon={faAnglesRight} /> PROMOÇÕES</a></li>
              <li><a href="#recados"><FontAwesomeIcon icon={faAnglesRight} /> RECADOS</a></li>
              <li><a href=""><FontAwesomeIcon icon={faAnglesRight} /> ANUCIE</a></li>
              <li><a href=""><FontAwesomeIcon icon={faAnglesRight} /> FALE CONOSCO</a></li>
            </ul>
          </nav>
        </div>

        <div className='container' id='contNet'>
          <Agenda />
          <Coberturas />
          <Anucio />
          <Noticias />
          <Visible />
          <GataBuritiVip />
          <Visible />
        </div>
        <Rodape />

    </>

  )
}

export default App
