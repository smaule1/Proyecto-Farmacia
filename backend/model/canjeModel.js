import mongoose from "mongoose";

//Schema
const canjeSchema = new mongoose.Schema({
    numero: {type: Number, required:true},
    fecha: {type: Date, required:true},
    cliente: {type: mongoose.Types.ObjectId, ref:'users', required:true},
    farmacia: {type: mongoose.Types.ObjectId, ref:'pharmacies', required:true}
});

//Model
const Canje = mongoose.model('canjes', canjeSchema);

export default Canje;