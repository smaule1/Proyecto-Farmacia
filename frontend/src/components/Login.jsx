import { useState } from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../Context';

function Login() {
  //Advertencia: Usar state para los valores de input del forms puede bajar el rendimiento
  // Este código se puede remplazar por variables normales.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // States necesarios
  const [alertMessage, setAlertMessage] = useState('');  
  const [emailClass, setEmailClass] = useState('form-control');
  const [passwordClass, setPasswordClass] = useState('form-control');

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailClass('form-control');
    setPasswordClass('form-control');    
    setAlertMessage('');

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

      if (response.ok) {
        const resBody = await response.json();
        setCurrentUser(resBody.data.user);
        console.log(currentUser);
      } else {
        const resBody = await response.json();
        for (const error of resBody.errors) {
          if (error.param) {
            switch (error.param) {
              case 'email':
                setEmailClass(emailClass + ' border-danger border-2');
                break;
              case 'password':
                setPasswordClass(passwordClass + ' border-danger border-2');
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
      <div className="col-md-4">
        <div className="card shadow-lg">
          <div className="mt-4 ms-4 mb-2">
            <h2>Iniciar Sesión</h2>
          </div>
          <div className="card-body mx-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">Correo Electrónico</label>
                <input type="email" className={emailClass} placeholder="Ingresa tu correo electrónico" aria-describedby="emailHelp"
                  value={email} onChange={(e) => setEmail(e.target.value)} required></input>
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className='form-label'>Contraseña</label>
                <input type="password" className={passwordClass} placeholder="Ingresa tu contraseña"
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
              {alertMessage && <div className="alert alert-danger row h-20" role="alert">{alertMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Login;