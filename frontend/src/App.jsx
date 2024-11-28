import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Home from './routes/Home';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from './Context';
import Purchase from './routes/Purchase';
import UserHistory from  './routes/UserHistory';
import PurchaseData from './routes/PurchaseData';
import UserState from './routes/UserState';
import Medicine from './routes/Medicine';
import MedicineDetail from './routes/MedicineDetails';
import CanjesHistory from './routes/CanjesHistory';
import RegisterPharmacy from './routes/RegisterPharmacy';

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
            <Route path="/*" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/userHistory" element={<UserHistory />} />
            <Route path="/userHistory/purchaseData/:id" element={<PurchaseData />} />
            <Route path="/beneficio" element={<Medicine />} />
            <Route path="/registrarFarmacia" element={<RegisterPharmacy />} />
            <Route path="/userState/medicineDetail/:id/:user" element={<MedicineDetail />} />
            <Route path="/userState" element={<UserState />} />
            <Route path="/canjesHistory" element={<CanjesHistory />} />
          </Route>   
          <Route path="/register" element={<Register />} />          
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
