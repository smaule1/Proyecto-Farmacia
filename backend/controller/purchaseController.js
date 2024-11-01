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