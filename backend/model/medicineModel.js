import mongoose from "mongoose";

//Enum
const Estado = {
    Permitido: "Permitido",
    Prohibido: "Prohibido"
};
Object.freeze(Estado);

//Schema
const medicineSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    descripcion: {type: String, required:true},
    presentacion: {type:String, required:true},
    estado: {type: String, enum: Object.keys(Estado), required:true},
    puntosRequeridos: {type: Number, required:true},
    puntosUnitarios: {type: Number, required:true}
});

//Model
const Medicine = mongoose.model('medicines', medicineSchema);

export default Medicine;