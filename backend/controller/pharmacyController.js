import Pharmacy from "../model/pharmacyModel.js";
import { getPharmacies as getPharmaciesLogic } from '../logic/pharmacyLogic.js';
//import mongoose from 'mongoose';

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

export const getPharmacies = async (req, res) => {
    try {
        const pharmacies = getPharmaciesLogic();
        res.send(pharmacies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const getPharmacyById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const pharmacy = await Pharmacy.findById(id);
        
        res.status(200).json(pharmacy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la farmacia');
    }
}