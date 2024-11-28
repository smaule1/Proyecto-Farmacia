import {
    createUser,
    getEmailById,
    getUserById
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

export const getUser = async (id) => {
    try {        
        return await getUserById(id);
    } catch (error) {
        throw error;
    }
}


