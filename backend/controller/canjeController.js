import Canje from "../model/canjeModel.js";

export const registrarCanje = async (req, res) => {
    const reqBody = req.body;
    try {
        const canje = new Canje(reqBody);
        await canje.save();
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});  
    }
};
