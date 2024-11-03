import { useState } from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../Context';


function Register() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  let alertMessage = '';  
  let nombreClass = 'form-control';
  let emailClass = 'form-control';
  let passwordClass = 'form-control';
  let password2Class = 'form-control';

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);
  
  console.log(currentUser);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    nombreClass = 'form-control';
    emailClass = 'form-control';
    passwordClass = 'form-control';
    password2Class = 'form-control';
    alertMessage = '';        

    if (password != password2) {
      password2Class =+ ' border-danger border-2'; 
      alertMessage = 'Ambas constraseñas deben ser iguales.';
      return;
    }

    await registerUser();
  };

  async function registerUser() {
    const url = `/api/users/registrar`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ nombreUsuario:nombreUsuario, email:email, password:password, rol:'Usuario' }),
        headers: myHeaders
      });

      if(response.ok){
        let resBody = await response.json();
        console.log(resBody);
      }

      //TODOD error handling
      // if (!response.ok) {
      //   let obj = await response.json();
      //   if (obj.error == "Invalid Input") {
      //     if (obj.type == "nombre") {
      //       setWarningClasses(nameInput);
      //       alertMessage = `<div class="alert alert-danger row h-20" role="alert">${obj.message}</div>`
      //     }
      //     if (obj.type == "email") {
      //       setWarningClasses(emailInput);
      //       addAlert(obj.message);
      //     }
      //     if (obj.type == "contraseña") {
      //       setWarningClasses(passwordInput);
      //       addAlert(obj.message);
      //     }
      //   } else if (obj.error == "Invalid Operation") {
      //     setWarningClasses(emailInput);
      //     addAlert(obj.message);
      //   }
      // } else {
      //   //window.location.pathname = "/Iniciosesion";
      // }

    } catch (error) {
      console.error(error.message);
      alertMessage = 'Ocurrió un error inesperado.';
    }
  }




  return (
    <div className="container h-75">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-4" >
          <div className="card shadow-lg">
            <div className="mt-4 ms-4 mb-2">
              <h2>Registrarse</h2>
            </div>
            <div className="card-body mx-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario</label>
                  <input type="text" className={nombreClass} placeholder="Ingresa tu nombre"
                    value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className={emailClass} placeholder="Ingresa tu correo electrónico"
                    value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className={passwordClass} placeholder="Ingresa tu contraseña"
                    value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar Contraseña</label>
                  <input type="password" className={password2Class} placeholder="Vuelve a ingresar tu contraseña"
                    value={password2} onChange={(e) => setPassword2(e.target.value)} required></input>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Registrarse</button>
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
  );
}

export default Register;
