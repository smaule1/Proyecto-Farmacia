import express from 'express';
import { registrar, login, logout, getUserNameById } from '../controller/userController.js';

const router = express.Router();
export default router;


router.post('/registrar', registrar);
router.post('/login', login);
router.get('/logout', logout);
router.get('/getUserNameById/:id', getUserNameById);

