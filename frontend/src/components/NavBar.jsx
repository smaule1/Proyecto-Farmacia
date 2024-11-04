import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function NavBar({rol}) {
  const[name, setName] = useState('');
  
  function renderInput(){
    rol !== 'Usuario' ? setName('Solicitudes Pendientes') : setName('Historial');
  }

  function renderCorrectNavBar(){
    return(
      <li className="nav-item">
        <Link className="nav-link text-dark" to="/purchase">Registrar Compra</Link>
      </li>
    )
  }
  useEffect(() => {
    renderInput();
  });

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">
          <Link to='/temp' className="navbar-brand h1 m-1">Sistema Beneficios</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item" id="registro">
                <Link className="nav-link text-dark" to='/temp'>Home</Link>
              </li>
                { rol === 'Usuario' && renderCorrectNavBar()}
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/userHistory">{name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;