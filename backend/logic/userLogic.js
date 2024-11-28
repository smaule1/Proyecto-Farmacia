import { createUser } from "../data/userDAO.js";
import { hashPassword } from "../utils/encrypter.js";


export const registrarUsuario = async (userData) => {    
    try {
        await hashPassword(userData);
        const user = createUser(userData);
        return user;
    } catch (error) {        
        throw error;
    }
}


