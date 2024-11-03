import mongoose from "mongoose";


//Schema
const pharmacySchema = new mongoose.Schema({
    nombre: {type: String, required:true},
});

//Model
const Pharmacy = mongoose.model('pharmacies', pharmacySchema);

export default Pharmacy;