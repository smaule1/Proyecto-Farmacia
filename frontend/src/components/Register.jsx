import { useState } from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../Context';


function Register() {
  //Advertencia: Usar state para los valores de input del forms puede bajar el rendimiento
  // Este código se puede remplazar por variables normales.
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // States necesarios
  const [alertMessage, setAlertMessage] = useState('');
  const [nombreClass, setNombreClass] = useState('form-control');
  const [emailClass, setEmailClass] = useState('form-control');
  const [passwordClass, setPasswordClass] = useState('form-control');
  const [passwordClass2, setPasswordClass2] = useState('form-control');  

  const {    
    setCurrentUser
  } = useContext(CurrentUserContext);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNombreClass('form-control');
    setEmailClass('form-control');
    setPasswordClass('form-control');
    setPasswordClass2('form-control');
    setAlertMessage('');

    if (password != password2) {
      setPasswordClass2(passwordClass2 + ' border-danger border-2');
      setPasswordClass(passwordClass + ' border-danger border-2');
      setAlertMessage('Ambas constraseñas deben ser iguales.');      
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
        body: JSON.stringify({ nombreUsuario: nombreUsuario, email: email, password: password, rol: 'Usuario' }),
        headers: myHeaders
      });

      if (response.ok) {
        const resBody = await response.json();
        setCurrentUser(resBody.data.user);        
      } else {
        const resBody = await response.json();        
        for (const error of resBody.errors) {          
          if (error.param) {
            switch (error.param) {
              case 'email':
                setEmailClass(emailClass + ' border-danger border-2');
                break;              
            }
          }
          setAlertMessage(error.message + '\n');          
        }
      }      
    } catch (error) {
      console.error(error.message);
      setAlertMessage('Ocurrió un error inesperado.');
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
                  <input type="password" className={passwordClass2} placeholder="Vuelve a ingresar tu contraseña"
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
                {alertMessage && <div className="alert alert-danger row h-20" role="alert">{alertMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
