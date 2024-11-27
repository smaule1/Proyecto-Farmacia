import { registrar } from './userController.js';
import { getPharmacies } from '../logic/pharmacyLogic.js'


export const registrarPerfilFarmacia = async (req, res) => {
    const farmacias = await getPharmacies();

    console.log(farmacias);

    const reqBody = req.body;

    console.log(reqBody);

    let nameList = [];
    for (let farmacia of farmacias) {
        nameList.push(farmacia.nombre);
    }

    console.log(nameList);

    if (!nameList.includes(reqBody.nombreUsuario)) {
        return res.status(400).json({ message: `${reqBody.nombreUsuario} is not a pharmacy name.` })
    }
    
    return res.sendStatus(200);

}