import './Rodape.css'
import imgLogo from '../img/logo.png'
const Rodape = () => {
  return (
    <footer id="footer">

      <div className='container' id='navFooter'>
        <nav className='nav_footer'>
          <ul>
            <li><a href="#"></a>INICAL</li>
            <li><a href="#"></a>QUEM SOMOS</li>
            <li><a href="#"></a>NOSSA EQUIPE</li>
            <li><a href="#"></a>COBERTURAS</li>
            <li><a href="#"></a>AGENDA</li>
            <li><a href="#"></a>NOTICIAS</li>
            <li><a href="#"></a>CONTRATE</li>
            <li><a href="#"></a>FALE CONOSCO</li>
          </ul>
        </nav>


        <div id='logo_rodape'>
          <img src={imgLogo} alt="" />
          <div className='text_rodape'>
              <h6>Copyright 2012 BuritiVip-Todos os direitos reservados.</h6>
                <h6>Nosso telefone: (99)9161-2367/8122-8082/8807-2316-Av Ceará,N.1750,Centro,Buriticupu-MA</h6>
          </div>
        </div>
      </div>


    </footer>
  )
}

export default Rodape
