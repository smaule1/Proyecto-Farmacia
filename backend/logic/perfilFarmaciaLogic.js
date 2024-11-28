import { getPharmacies } from '../logic/pharmacyLogic.js'
import { registrarUsuario } from '../logic/userLogic.js'


export const registrarPerfilFarmacia = async (user) => {
    const farmacias = await getPharmacies(); 

    let nameList = [];
    for (let farmacia of farmacias) {
        nameList.push(farmacia.nombre);
    }

    if (!nameList.includes(user.nombreUsuario)) {        
        throw `${user.nombreUsuario} is not a pharmacy name.`;        
    }
    
    if (user.rol !== "Farmacia") {
        throw `${user.rol} is not the pharmacy rol.`;
    }
    
    try {
        return user = await registrarUsuario(user);        
    }catch(error) {
        throw error;
    }
}