import express from 'express';
import { registrarPerfilFarmacia } from '../controller/perfilFarmaciaFacade.js';

const router = express.Router();
export default router;


router.post('/registrar', registrarPerfilFarmacia);

