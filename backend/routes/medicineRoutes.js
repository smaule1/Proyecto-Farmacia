import express from 'express';
import { registrar, getMedicines, setBeneficio, getMedicineById, getAllowedMedicines} from '../controller/medicineController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.post('/setBeneficio', setBeneficio);
router.get('/getAll', getMedicines);
router.get('/getAllowed', getAllowedMedicines);
router.get('/getMedicineById/:id', getMedicineById);
