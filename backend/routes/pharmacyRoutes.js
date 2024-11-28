import express from 'express';
import { registrar, getPharmacies, getPharmacyById, getPharmacyByName } from '../controller/pharmacyController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getPharmacies);
router.get('/getPharmacyById/:id', getPharmacyById);
router.get('/getPharmacyByName/:name', getPharmacyByName);
