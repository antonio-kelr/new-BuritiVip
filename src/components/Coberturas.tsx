import './Cobertura.css'
import { FaPlus } from 'react-icons/fa'
import imgCObertua from '../img/desig-5.png'
import photoCobertura from '../img/img-cbtrs.webp'
import { FaCamera } from 'react-icons/fa'
import { FaImages } from 'react-icons/fa'
import { FaVideo} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMobileRetro} from '@fortawesome/free-solid-svg-icons'



const Coberturas = () => {
    return (
        <>
            <div id='COBERTUA'>
                <div className="coberturas_logos">
                    <div className="logo_cobertua">
                        <h3>COBERTURAS</h3>
                        <img src={imgCObertua} alt="" />
                    </div>
                    <div className="text_mais">
                        <a href="">
                            <i><FaPlus /></i>
                            <span> mais coberturas </span>
                        </a>
                    </div>
                    
                    <div className="text-ctt">
                        <i><FontAwesomeIcon icon={faMobileRetro}/></i>
                        <span className="contratar">Contrate nossa equipe para fazer a cobertura do seu evento:
                            <span>(98)3072-2012</span> </span>
                        <span className="contratar-quie">contrate nossa equipe para fazer a cobertura do seu evento: <a href="">aqui</a> </span>
                    </div>


                </div>

                <div id="photo_cobetrs">
                    <div className="img" id="imagems1">
                        <img src={photoCobertura} alt="" />
                        <p>Conquetel de laçamento do Forro fets</p>
                        <div className="data-fts">
                            <span>13/05/2012</span>
                            <span>65 fotos</span>
                        </div>
                    </div>
                    <div className="img" id="imagems2">
                        <img src={photoCobertura} alt="" />

                        <p>Boate Live itz-Fetsta a Fantasia ll</p>
                        <div className="data-fts">
                            <span>13/05/2012</span>
                            <span>80 fotos</span>
                        </div>
                    </div>
                    <div className="img" id="imagems3">
                        <img src={photoCobertura} alt="" />

                        <p>Carnaval de Buriticupu  2013-Primeiro dia</p>
                        <div className="data-fts">
                            <span>13/05/2012</span>
                            <span>80 fotos</span>
                        </div>
                    </div>
                    <div className="img" id="imagems4">
                        <img src={photoCobertura} alt="" />

                        <p>Carnaval de Buriticupu  2013-Segundo dia</p>
                        <div className="data-fts">
                            <span>13/05/2012</span>
                            <span>80 fotos</span>
                        </div>
                    </div>
                    <div className="img" id="imagems5">
                        <img src={photoCobertura} alt="" />

                        <p>Carnaval de Buriticupu  2013-Segundo dia</p>
                        <div className="data-fts">
                            <span>13/05/2012</span>
                            <span>80 fotos</span>
                        </div>
                    </div>
                    <div className="imgs img" id="imagems6">
                        <div className="icons">
                            <i><FaCamera/></i>
                            <span>Fotos</span>
                        </div>
                        <div className="icons">
                            <i><FaVideo/></i>
                            <span>Videos</span>
                        </div>
                        <div className="icons">
                            <i><FaImages/></i>
                            <span>Books</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Coberturas
