import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Temp from './components/Temp';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from './Context';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        <NavBar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/temp" element={<Temp />} />
          </Route>          
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;