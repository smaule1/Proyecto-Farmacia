import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import {connectDB} from './mongoDriver.js'



import userRoutes from './routes/userRoutes.js'


dotenv.config();

const app = express();

const corsOptions = {
	origin : /http:\/\/127.0.0.1:.*/,	
	credentials: true,
};
app.use(cors(corsOptions))

app.use(express.json()); 


app.use('/users', userRoutes);



const httpsOptions = {
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
  };

const server = https.createServer(httpsOptions, app);

server.listen(5000, async () => {
	console.log("Server started at https://localhost:5000");  
	await connectDB();    	
});




