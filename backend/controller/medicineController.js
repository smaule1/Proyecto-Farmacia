import Medicine from "../model/medicineModel.js";
//import mongoose from 'mongoose';

//Esto me parece que no hace falta pero está por ahora
export const registrar = async (req, res) => {
    const reqBody = req.body;

    try {
        const medicine = new Medicine(reqBody);
        await medicine.save();
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});  
    }
};

export const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'nombre');
        res.send(medicines);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}