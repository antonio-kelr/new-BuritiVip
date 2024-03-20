import './Agenda.css'
import './Agenda.css'
import imgCarrosuel from '../img/img-carrosuel.jpg'
import imgAgenda from '../img/agenda1.png'


import { FaAngleRight } from 'react-icons/fa'
import { FaAngleLeft } from 'react-icons/fa'
const Agenda = () => {


    return (
        <>

            <div id="carouselExampleIndicators" className="carousel slide">


                <div id='div-flex'>
                    <div id="carouselExampleCaptions" className="carousel slide">
                        <div className="carousel-indicato">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"><p className='color'></p></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"><p className='color'></p></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"><p className='color'></p></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"><p className='color'></p></button>

                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
                            </div>

                            <div className="carousel-item">
                                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
                            </div>

                            <div className="carousel-item">
                                <img src={imgCarrosuel} className="d-block w-100" alt="..." />
                            </div>

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className='buto1' aria-hidden="true"><FaAngleLeft /></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className='buto2' aria-hidden="true"><FaAngleRight /></span>
                        </button>
                    </div>
                    <div className="agendas" id="AGENDA">
                        <div className="linha">
                            <h3>AGENDA</h3>
                            <img src={imgAgenda} alt="" />
                        </div>
                        <div className="cont">
                            <div className="list lista">
                                <div className="LIST-CALE cale">
                                    <div>JUN</div>
                                    <div>07</div>
                                </div>
                                <div>
                                    <h5>Skol Sensation</h5>
                                    <h5>Live ITZ</h5>
                                </div>
                            </div>
                            <div className="list">
                                <div className="LIST-CALE">
                                    <div>AGO</div>
                                    <div>12</div>
                                </div>
                                <div>
                                    <h5>Maranhão Forro fest 2012</h5>
                                    <h5>Parque de Esposicções</h5>
                                </div>
                            </div>
                            <div className="list">
                                <div className="LIST-CALE">
                                    <div>AGO</div>
                                    <div>12</div>
                                </div>
                                <div>
                                    <h5>Maranhão Forro fest 2012</h5>
                                    <h5>Parque de Esposicções</h5>
                                </div>
                            </div>
                            <div className="list">
                                <div className="LIST-CALE">
                                    <div>SET</div>
                                    <div>20</div>
                                </div>
                                <div>
                                    <h5>Show jorge e Mateus</h5>
                                    <h5>Parque de Esposicções</h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>







            </div>


        </>
    )
}

export default Agenda
