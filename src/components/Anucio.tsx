import './Anucio.css'
import imgAnucio from '../img/desing-3.png'
const Anucio = () => {
  return (
    <div id="anucio">
      <div className='row' id='linhaRow'>

        <div className="col" id='anucio_img'>
          <img src={imgAnucio} alt="" />
        </div>

        <div className="col-3 bg-danger">
        </div>

      </div>
      



    </div>
  )
}

export default Anucio



