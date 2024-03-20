import './GataBuritiVip.css'
import imgauzte from '../img/desig-5.png'
import imgDAvid from '../img/david.jpg'
import imgGata from '../img/photo-gata.jpg'
import imgBolha from '../img/msg-desig-4.png'
import { FaPlus } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'


const GataBuritiVip = () => {
    return (
        <div id='row-gatas'>
            <div className="col-3 img_items" >
                <div className="noti_PLus concert_content dj_img">
                    <h3>TOP DJ</h3>
                    <img src={imgauzte} alt="" />

                    <div className="link_not concert">
                        <a href="">
                            <i><FaPlus /></i>
                            <span> DJs</span>
                        </a>
                    </div>

                </div>
                <div className='David'>
                    <div className='img_item'>
                        <img src={imgDAvid} alt="" />

                        <h3>David Guetta</h3>
                        <div>
                            <h6>Legal, sincera, divertida, Timida, Sorridente, alegre,amiga</h6>
                        </div>
                    </div>

                </div>



            </div>



            <div className="col img_items">
                <div className="noti_PLus concert_content cat">
                    <h3>GATA BURITIVIP</h3>
                    <img src={imgauzte} alt="" />

                    <div className="link_not concert">
                        <a href="">
                            <i><FaPlus /></i>
                            <span> mais gatas</span>
                        </a>
                    </div>
                </div>
                <div className='David cat_item'>
                    <div className='img_gata'>
                        <img src={imgGata} alt="" />

                        <div className='img_bolha'>
                            <div className='text_cat'>
                                <h1>Daniela Saraiva</h1>
                                <h6>Legal, sincera, divertida, Timida, Sorridente, alegre,amiga</h6>
                                <button className='button_cout'>
                                    <i><FaPlay /></i>
                                    conheça a gata
                                </button>
                            </div>
                            <img src={imgBolha} alt="" />
                            <div className='anucio_cat'>
                                <span>Quer ser a proxima gata?</span>
                            </div>
                        </div>
    
                    </div>


                </div>


            </div>
            
            <div className="col img_items" id='recados'>
                <div className="noti_PLus concert_content  img_rec">
                    <h3>RECADOS</h3>
                    <img src={imgauzte} alt="" />

                    <div className="link_not concert">
                        <a href="">
                            <i><FaPlus /></i>
                            <span> mais recados</span>
                        </a>
                    </div>
                </div>
                <div className="David">
                    <div className="seta_re">
                        <span>DE:</span>
                        <h3>Helton ALves</h3>
                    </div>
                    <div className="seta_re">
                        <span>PARA:</span>
                        <h3>Daniel SOusa</h3>
                    </div>

                    <div className="arrow_re">
                        <div>
                            <h3 dangerouslySetInnerHTML={{ __html: 'Jan adoreiiiiii seu programa de hoje (Paradão ser -tanejo),no estilo(FORRONEJO), muiiiiito bom, con- tagio legal, tá ai que seria muito bom ter um pro- grama nesse formato,fazer essas 2junções,esses 2ritmos num só programa. Valeuuuuuuuu,nota mil pra vc,bjooos!!' }} />
                        </div>

                        <div className="buttoes_re">
                            <button>ler todos</button>
                            <button>enviar recados</button>
                        </div>
                    </div>

                </div>


            </div>


        </div>
    )
}

export default GataBuritiVip
