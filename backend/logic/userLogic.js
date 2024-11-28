import { createUser } from "../data/userDAO";
import { hashPassword } from "../utils/encrypter";


export const registrarUsuario = async (userData) => {    
    try {
        await hashPassword(userData);
        const user = createUser(userData);
        return user;
    } catch (error) {        
        throw error;
    }
}


