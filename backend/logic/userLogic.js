import {
    createUser,
    getEmailById
} from "../data/userDAO.js";
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


export const getUsernameById = async (id) => {
    try {        
        return await getEmailById(id);
    } catch (error) {
        throw error;
    }
}


