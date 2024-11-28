import User from '../model/userModel.js';


export const createUser = async (userData) => {
    const user = new User(userData);

    try {        
        await user.save();  
        return user.toObject();                      
    } catch (error) {
        const errorList = handleMongooseErros(error);
        throw errorList;
    }
}

export const getEmailById = async (id) => {    
    try {        
        const user = await User.findById(id, 'email');
        return user.toObject();                      
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw 'Invalid id';
    }    
    try {
        const user = await User.findById(id);
        return user.toObject();
    } catch (error) {
        throw error;
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