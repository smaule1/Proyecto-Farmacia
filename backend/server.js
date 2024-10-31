import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './mongoDriver.js'



import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();

app.use(cors())

app.use(express.json()); 


app.use('/users', userRoutes);

app.listen(5000, async ()=>{
	console.log("Server started at http://localhost:5000");  
	connectDB();    	
});

