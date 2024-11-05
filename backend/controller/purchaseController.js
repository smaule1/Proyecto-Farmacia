import Purchase from "../model/purchaseModel.js";
//import mongoose from 'mongoose';

export const registrar = async (req, res) => {
    const reqBody = req.body;

    try {
        const purchase = new Purchase(reqBody);
        await purchase.save();
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});  
    }
};

export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({estado: 'Pendiente'}, 'numeroFactura estado');
        res.send(purchases);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const getPurchasesByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.find({cliente: id}, 'numeroFactura estado');
        res.send(purchases);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const getPurchasesById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.findById(id);
        res.send(purchases);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}