import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectDB} from './mongoDriver.js'
import userRoutes from './routes/userRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import pharmacyRoutes from './routes/pharmacyRoutes.js'
import purchaseRoutes from './routes/purchaseController.js'
import perfilFarmaciaRoutes from './routes/perfilFarmaciaRoutes.js'

dotenv.config();

const app = express();

app.use(cors())

app.use(express.json({ limit: '5mb' })); 

app.use(cookieParser());

app.use(express.static('frontend/dist'));

app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/perfilFarmacia', perfilFarmaciaRoutes);


const port = process.env.PORT || 5000;

app.listen(port, async ()=>{
	console.log(`Server started at port ${port}`);  
	connectDB();    	
});


