import mongoose from "mongoose";

//Schema
const canjeSchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required:true},
    fecha: {type: String, required:true},
    cliente: {type: mongoose.Types.ObjectId, ref:'users', required:true},
    farmacia: {type: mongoose.Types.ObjectId, ref:'pharmacies', required:true}
});

//Model
const Canje = mongoose.model('canjes', canjeSchema);

export default Canje;