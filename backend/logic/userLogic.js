import User from '../model/userModel.js';
import bcrypt from "bcrypt";

export const registrarUsuario = async (userData) => {
    const user = new User(userData);

    try {
        await hashPassword(user);
        await user.save();  
        return user.toObject();                      
    } catch (error) {
        const errorList = handleMongooseErros(error);
        throw errorList;
    }
}

function handleMongooseErros(errorObj) {
    const errors = [];

    console.log(errorObj);

    if (errorObj.code == 11000) {
        const param = Object.keys(errorObj.keyPattern)[0];
        const message = `Ese ${param} ya esta registrado.`;
        const error = { param: param, message: message };
        errors.push(error);

    } else {
        const errorList = Object.values(errorObj.errors);

        for (const err of errorList) {
            console.log(err);

            const param = err.path;
            let message = '';
            switch (err.kind) {
                case 'required':
                    message = `El paramámetro ${param} es requerido.`
                    break;
                case 'enum':
                    message = `El paramámetro ${param} debe tener un valor permitido.`
                    break;
                default:
                    break;
            }
            const error = { param: param, message: message };
            errors.push(error);
        }
    }
    return errors;
}

async function hashPassword(user){
    let salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);    
}