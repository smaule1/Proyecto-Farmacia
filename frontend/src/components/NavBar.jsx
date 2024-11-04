
function NavBar() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">
          <a className="navbar-brand h1 m-1" href="#">Sistema Beneficios</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item" id="registro">
                <a className="nav-link text-dark" href="#">Home</a>
              </li>
              <li className="nav-item" id="inicioSesion">
                <a className="nav-link text-dark" href="/purchase">Registrar Compra</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/userHistory">Historial</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;