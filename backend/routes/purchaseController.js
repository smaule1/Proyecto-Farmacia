import express from 'express';
import { registrar, getPurchases, getPurchasesByUser, getPurchasesById, corroborar, getLastPurchasesByUser, getLastPurchases} from '../controller/purchaseController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getPurchases);
router.get('/getPurchaseByUser/:id', getPurchasesByUser);
router.get('/getPurchaseById/:id', getPurchasesById);
router.get('/corroborar/:id-:estado', corroborar);
router.get('/getLastPurchasesByUser/:id', getLastPurchasesByUser);
router.get('/getLastPurchases', getLastPurchases);
