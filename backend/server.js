import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './mongoDriver.js'



import userRoutes from './routes/userRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import pharmacyRoutes from './routes/pharmacyRoutes.js'
import purchaseRoutes from './routes/purchaseController.js'

dotenv.config();

const app = express();

app.use(cors())

app.use(express.json()); 


app.use('/api/users', userRoutes);
app.use('/medicines', medicineRoutes);
app.use('/pharmacies', pharmacyRoutes);
app.use('/purchases', purchaseRoutes);

app.listen(5000, async ()=>{
	console.log("Server started at http://localhost:5000");  
	connectDB();    	
});

