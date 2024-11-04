import express from 'express';
import { registrar, getPharmacies } from '../controller/pharmacyController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getPharmacies);
