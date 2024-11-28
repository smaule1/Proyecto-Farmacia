import express from 'express';
import { registrarCanje } from '../controller/canjeController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrarCanje);

