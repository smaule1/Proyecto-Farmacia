import Pharmacy from "../model/pharmacyModel";
import mongoose from 'mongoose';

//Esto me parece que no hace falta pero está por ahora
export const registrar = async (req, res) => {
    const reqBody = req.body;

    try {
        const pharmacy = new Pharmacy(reqBody);
        await pharmacy.save();
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});  
    }
};