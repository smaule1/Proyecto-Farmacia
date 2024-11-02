
function Login() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow-lg">
            <div className="card-header text-center bg-primary text-white">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="card-body">
              <form id="loginForm">
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" id="Email" placeholder="Ingresa tu correo electrónico" aria-describedby="emailHelp" required></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="Password" placeholder="Ingresa tu contraseña" required></input>
                </div>
                <div className="d-grid">
                  <button type="button" id="btnIniciarSesion" className="btn btn-primary">Iniciar Sesión</button>
                </div>
              </form>
              <div id="alertDiv">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;