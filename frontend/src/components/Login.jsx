import { useState } from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../Context';

function Login() {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  let alertMessage = '';  
  let emailClass = 'form-control';
  let passwordClass = 'form-control';

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailClass = 'form-control';
    passwordClass = 'form-control';
    alertMessage = '';    

    await logIn();
  };

  async function logIn() {
    const url = `/api/users/login`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: myHeaders
      });

      console.log(response);
      //TODO error handling
      // if (!response.ok) {
      //   let obj = await response.json();
      //   if (obj.error == "Invalid Input") {
      //     if (obj.type == "Email") {
      //       setWarningClasses(emailInput);
      //       addAlert(obj.message);
      //     }
      //     if (obj.type == "Password") {
      //       setWarningClasses(passwordInput);
      //       addAlert(obj.message);
      //     }
      //   }
      //   if (obj.error == "Not Auth") {
      //     addAlert(obj.message);
      //   }
      //   if (obj.error == "Not Found") {
      //     addAlert(obj.message);
      //   }
      // } else {
      //   let sessionData = await response.json();
      //   sessionStorage.setItem("_User", sessionData.userId);
      //   sessionStorage.setItem("_UserName", sessionData.name);
      //   sessionStorage.setItem("_UserEmail", sessionData.email);
      //   sessionStorage.setItem("_SessionId", sessionData.sessionId);
      //   window.location.pathname = "/Homepage"; // creo que es homepage?
      // }
    } catch (error) {
      console.error(error.message);
      alertMessage = 'Ocurrió un error inesperado';
    }
  }

  return (
    <div className="container h-75">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-4">
        <div className="card shadow-lg">
        <div className="mt-4 ms-4 mb-2">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="card-body mx-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" aria-describedby="emailHelp"
                  value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control"  placeholder="Ingresa tu contraseña"
                  value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </div>
              </form>
              <div className="mt-3">
                <p>¿Ya tienes una cuenta? Inicia Sesión</p>
              </div>
              <div className="mt-3">                
                {alertMessage && <div className="alert alert-danger row h-20" role="alert">${alertMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;