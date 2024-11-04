import express from 'express';
import { registrar, getMedicines} from '../controller/medicineController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/getAll', getMedicines);
