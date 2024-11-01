import express from 'express';
import { registrar, login } from '../controller/userController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.get('/login', login);

