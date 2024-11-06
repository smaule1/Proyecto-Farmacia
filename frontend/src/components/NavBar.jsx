import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../Context';

function NavBar() {  
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext); 

  function renderCorrectNavBar() {
    return (
      <li className="nav-item">
        <Link className="nav-link text-dark" to="/purchase">Registrar Compra</Link>
      </li>
    )
  }
  
  const logout = async () => {  

    const url = `/api/users/logout`;      
    try {
      const response = await fetch(url, {
        method: "GET",        
        credentials: 'include'
      });      
      if (response.ok){        
        setCurrentUser(null);
        navigate('/login');
      }            
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">
          <Link to='/Home' className="navbar-brand h1 m-1">Sistema Beneficios</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                {currentUser && <Link className="nav-link text-dark" to='/Home'>Home</Link>}
              </li>
              {currentUser && currentUser.rol === 'Usuario' && renderCorrectNavBar()}
              <li className="nav-item">
                {currentUser && <Link className="nav-link text-dark" to="/userHistory">{currentUser.rol !== 'Usuario' ? 'Solicitudes Pendientes' : 'Historial'}</Link>}
              </li>
              <li className='nav-item'>
                {currentUser && currentUser.rol === 'Administrador' && <Link className="nav-link text-dark" to="/beneficio">Gestionar Medicamentos</Link>}
              </li>
              <li className="nav-item">
                {currentUser && <button className="nav-link text-dark" onClick={logout}>Cerrar Sesión</button>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;