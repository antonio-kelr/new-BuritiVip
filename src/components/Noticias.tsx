import './Noticias.css'
import imgMulher from '../img/mulher.jpeg'
import imgMoto from '../img/desi-cb300.png'
import imgauzte from '../img/desig-5.png'
import { FaPlus } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
const Noticias = () => {
    return (
        <>
            <div id="Noticias">
                <div className="row" id='row_items'>
                    <div className="col-7 " id="not">
                        <div className="noti_PLus" id='notis'>
                            <h3>NOTÍCIAS</h3>
                            <img src={imgauzte} alt="" />

                            <div className="link_not">
                                <a href="">
                                    <i><FaPlus /></i>
                                    <span> mais noticias</span>
                                </a>
                            </div>
                        </div>
                        <div id='padii'>
                            <div id='Coud_Not'>
                                <div className="Acad_not">
                                    <div>
                                        <img src={imgMulher} alt="" />
                                    </div>
                                    <div className="text_not">
                                        <div>
                                            <span>Brasil</span>
                                            <span>14/05/2012</span>
                                        </div>
                                        <h3>Em Buriticupu vocé já pode contar com uma academia completa que oferece
                                            loga.
                                        </h3>
                                        <h3>O aumento da capacidade de concetração é apenas uma das vontagens dos
                                            exercicios
                                            e meditação realidos nas sessões de loga da academia Bolo de Ferro.</h3>
                                    </div>
                                </div>

                            </div>
                            <div id='marahao_not'>
                                <div className="acad_not">
                                    <span>Maranhão</span>
                                    <span>14/05/2012</span>
                                    <h3>Em Buriticupu vocé já pode contar com uma academia completa que oferece loga.</h3>
                                </div>
                                <div className="acad_not">
                                    <span>Maranhão</span>
                                    <span>14/05/2012</span>
                                    <h3>Em Buriticupu vocé já pode contar com uma academia completa que oferece loga.</h3>
                                </div>
                                <div className="acad_not not_1">
                                    <span>Maranhão</span>
                                    <span>14/05/2012</span>
                                    <h3>Em Buriticupu vocé já pode contar com uma academia completa que oferece loga.</h3>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div className="col" id="clasF">

                        <div className="noti_PLus clasf">
                            <h3>CLASSIFICADOS</h3>
                            <img src={imgauzte} alt="" />

                            <div className="link_not">
                                <a href="">
                                    <i><FaPlus /></i>
                                    <span> mais anúcios</span>
                                </a>
                            </div>
                        </div>
                        <div id='Coud_classf'>
                            <div className="Caoud_classf">
                                <div id='clasf_moto'>
                                    <a href="">
                                        <i>
                                            <FaPlay />
                                        </i>
                                        MOTO
                                    </a>
                                </div>
                                <div>
                                    <img src={imgMoto} alt="" />
                                </div>
                                <div className="text_clssf">
                                    <h3>MOTO:Honda CB300 Hornert (2009)</h3>
                                    <h3>Moto completa, em perfeita estado de conservação.Perfeita para rodar na cidade,capacidade de 18litros. Quer compra essa moto? <a href="">clique aqui</a></h3>
                                </div>
                            </div>

                            <div id='clear-btn'>
                                <button>CRIE O SEU ANÚCIO</button>
                                <button className='arrow'>
                                    PRÓXIMA OFERTA
                                    <i><FontAwesomeIcon icon={faRightLong} /></i>

                                </button>
                            </div>
                        </div>




                    </div>
                </div>
            </div>

        </>
    )
}

export default Noticias
