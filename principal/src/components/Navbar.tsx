import { Link } from 'react-router-dom'
import Contraste from './Contraste'

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        📷 Meu Web Site
      </div>

      <div className="menu">

        <Link to="/">
          Início
        </Link>

        <Link to="/fotos">
          Fotos
        </Link>

        <Link to="/cadastro"> 
          Cadastro 
        </Link>

        <Link to="/sobre">
          Sobre
        </Link>

        <Contraste />

      </div>

    </nav>
  )
}

export default Navbar