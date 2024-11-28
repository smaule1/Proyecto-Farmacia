import express from 'express';
import { registrarCanje, getCanjesByUser } from '../controller/canjeController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrarCanje);
router.post('/getCanjesByUser/:id', getCanjesByUser);

