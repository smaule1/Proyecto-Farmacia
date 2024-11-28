import Canje from "../model/canjeModel.js";

export const registrarCanje = async (req, res) => {
    const reqBody = req.body;
    const consecutive = await consecutiveNumber();

    try {
        const canje = new Canje({
            numero: consecutive,
            fecha: reqBody.fecha, 
            cliente: reqBody.cliente,
            farmacia: reqBody.farmacia,
        });
        await canje.save();
        
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});  
    }
};

async function consecutiveNumber(){
    const consecutive = await Canje.findOne().sort({ numero: -1 });
    if (!consecutive){
        return 1;
    }

    return consecutive.numero + 1;
}

export const getCanjesByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const canjes = await Canje.find({ cliente: id });
        res.send(canjes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}