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
        const purchases = await Purchase.find({estado: 'Pendiente'}, 'numeroFactura fecha estado');
        res.send(purchases);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const getPurchasesByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.find({cliente: id}, 'numeroFactura fecha estado');
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

export const getFilteredPuchases = async (req, res) => {
    try {
        const parameter1 = req.query.param1;
        const parameter2 = req.query.param2;

        if (parameter1 == 'null'){
            const date = new Date(parameter2);
            const purchases = await Purchase.find({fecha: date, cliente}, 'numeroFactura estado');
            res.send(purchases);

        } else if (parameter2 == 'null'){
            const sequence = Number(parameter1);
            const purchases = await Purchase.find({numeroFactura: sequence}, 'numeroFactura estado');
            res.send(purchases);
        } else{
            const sequence = Number(parameter1);
            const date = new Date(parameter2);
            const purchases = await Purchase.find({numeroFactura: sequence, fecha: date}, 'numeroFactura estado');
            res.send(purchases);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const corroborar = async (req, res) => {    
    try {
        const { id } = req.params;
        const { estado } = req.params;
        const purchase = await Purchase.findById(id);
        purchase.estado = estado;
        await purchase.save();
        res.send(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar compra');
    }
};

export const aprobar = async (req, res) => {    
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);
        purchase.estado = 'Aprobada';
        await purchase.save();
        res.send(purchases);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
};
