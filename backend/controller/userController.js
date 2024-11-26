import User from '../model/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


const MAX_AGE = 1000 * 60 * 60;

export const registrar = async (req, res) => {
    const reqBody = req.body;


    const user = new User(reqBody);

    try {
        await hashPassword(user);
        await user.save();
        const token = createToken(user);
        res.cookie('userInfo', token, { httpOnly: true, maxAge: MAX_AGE, sameSite: 'strict' }) //maxAge 1 hora
        res.status(200).json({ data: { user } });            
    } catch (error) {
        const errorList = handleMongooseErros(error);
        res.status(400).json({ errors: errorList });
    }
};


export const login = async (req, res) => {
    
    //Token Authenticaton
    const reqToken = req.cookies.userInfo;
    if (reqToken) { //ReqToken se encuentra en los cookies            
        try {
            const decodedToken = jwt.verify(reqToken, process.env.JWT_PRIVATE_KEY);  //ReqToken es válido                                     
            const user = await getUser(decodedToken._id);
            const token = createToken(user);
            //Enviar token fresco al usuario
            res.cookie('userInfo', token, { httpOnly: true, maxAge: MAX_AGE, sameSite: 'strict' })
            res.status(200).json({ data: { user } });
            return;
        } catch (err) {
            console.log(err);
            if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') { //ReqToken es inválido
                res.cookie('userInfo', '', { maxAge: 1, sameSite: 'strict', httpOnly: true }); //El token inválido se elimina de las cookies                                        
            } else {
                res.status(500).json({ errors: [{ message: err }] });//No se pudo conseguir el Usuario, error del servidor
                return;
            }
        }
    }

//Credential Authentication
const { email, password } = req.body;
//Validation
if (!email || !password) {
    res.status(400).json({ errors: [{ message: 'Parámetros insuficientes.' }] });
    return;
}
//Get User by Email
const user = await User.findOne({ 'email': email });
if (!user) {
    res.status(400).json({ errors: [{ param: 'email', message: 'El correo electónico no está registrado.' }] });
    return;
}
//Check Password
const auth = await bcrypt.compare(password, user.password);
if (!auth) {
    res.status(400).json({ errors: [{ param: 'password', message: 'Contraseña Incorrecta' }] });
    return;
}
//Response Token and User data 
const token = createToken(user);
res.cookie('userInfo', token, { httpOnly: true, maxAge: MAX_AGE, sameSite: 'strict' }) //maxAge 1 hora
res.status(200).json({ data: { user } });
};

export const logout = async (req, res) => {
    res.cookie('userInfo', '', { maxAge: 1, httpOnly: true, sameSite: 'strict' });
    res.sendStatus(200);    
};

export const getUserNameById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id, 'email');
        res.send(user);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las farmacias');
    }
}

function createToken(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            rol: user.rol
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "15m" }
    );
    return token;
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

async function getUser(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid id');
    }    
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

async function hashPassword(user){
    let salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);    
}
