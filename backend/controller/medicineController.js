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

export const setBeneficio = async (req, res) => {
    const {id, estado, totalPuntos, puntos} = req.body;

    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(id, 
            {estado, puntosRequeridos: totalPuntos, puntosUnitarios: puntos}, 
            {new:true, runValidators:true});
        
        if(!updatedMedicine) {
            return res.status(404).send('Error: No se encontró la medicina');
        }

        // No sé si hace falta que regrese la medicina después del update pero por ahora está así
        res.status(200).json(updatedMedicine);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el estado de la medicina');
    }
};

export const getMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const medicines = await Medicine.findById(id);
        res.send(medicines);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las medicinas');
    }
}

export const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'nombre');
        res.send(medicines);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las medicinas');
    }
}