import Purchase from "../model/purchaseModel.js";
import User from '../model/userModel.js';
import Medicine from "../model/medicineModel.js";
import jwt from 'jsonwebtoken';
//import mongoose from 'mongoose';

export const registrar = async (req, res) => {
    const reqBody = req.body;
    const buffer = Buffer.from(reqBody.imgFactura.data, 'base64');
    reqBody.imgFactura.data = buffer;
    try {
        const purchase = new Purchase(reqBody);
        await purchase.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ estado: 'Pendiente' }, 'numeroFactura fecha estado');
        res.send(purchases);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

export const getPurchasesByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.find({ cliente: id }, 'numeroFactura fecha estado');
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

export const getLastPurchasesByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.find({ cliente: id }, 'numeroFactura fecha estado')
            .sort({ _id: -1 })
            .limit(5);

        res.send(purchases);

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
        if (estado === 'Aprobada'){
            const user = await User.findById(purchase.cliente);
            const medicine = await Medicine.findById(purchase.medicamento);
            user.puntos += purchase.cantidad * medicine.puntosUnitarios;
            await user.save();
        }
        res.send(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar compra');
    }
};


export const getLastPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ estado: 'Pendiente' }, 'numeroFactura fecha estado')
            .sort({ _id: -1 })
            .limit(5);
        res.send(purchases);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
};
