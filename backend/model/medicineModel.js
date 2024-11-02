import mongoose from "mongoose";


//Schema
const medicineSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    descripcion: {type: String, required:true},
    presentacion: {type:String, required:true},
    puntos: {type: Number, required:true}
});

//Model
const Medicine = mongoose.model('medicines', medicineSchema);

export default Medicine;