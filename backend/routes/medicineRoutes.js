import express from 'express';
import { registrar } from '../controller/medicineController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
