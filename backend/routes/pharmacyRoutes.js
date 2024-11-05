import express from 'express';
import { registrar, getPharmacies, getPharmacyById } from '../controller/pharmacyController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getPharmacies);
router.get('/getPharmacyById/:id', getPharmacyById);
