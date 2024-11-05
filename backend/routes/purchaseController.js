import express from 'express';
import { registrar, getPurchases, getPurchasesByUser, getPurchasesById} from '../controller/purchaseController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getPurchases);
router.get('/getPurchaseByUser/:id', getPurchasesByUser);
router.get('/getPurchaseById/:id', getPurchasesById);
