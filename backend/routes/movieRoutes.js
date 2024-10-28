import express from 'express';
import { getMovies } from '../controller/movieController.js';



const router = express.Router();
export default router;


router.get('/', getMovies);




