import { registrarPerfilFarmacia as registrar } from "../logic/perfilFarmaciaLogic.js";


export const registrarPerfilFarmacia = async (req, res) => {    
    const reqBody = req.body;
    try {
        const user = await registrar(reqBody);             
        return res.status(200).json({ data: { user } });  
    }catch(error) {        
        return res.status(400).json(error);
    }        

}