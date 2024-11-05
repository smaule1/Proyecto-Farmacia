import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Temp from './components/Temp';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from './Context';
import Purchase from './routes/Purchase';
import UserHistory from  './routes/UserHistory';
import PurchaseData from './routes/PurchaseData'

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
      <NavBar/>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Temp />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/userHistory" element={<UserHistory />} />
            <Route path="/userHistory/purchaseData/:id" element={<PurchaseData />} />
          </Route>
          <Route path="/register" element={<Register />} />          
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
