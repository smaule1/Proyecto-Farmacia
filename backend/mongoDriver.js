import mongoose from 'mongoose';


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, dbName:process.env.DB_NAME };

export const connectDB = async () => {
    try {
     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    const conn = await mongoose.connect(process.env.MONGO_URI, clientOptions); 
    console.log(`${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

  