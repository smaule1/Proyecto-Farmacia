import User from '../model/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";



export const registrar = async (req, res) => {
    const reqBody = req.body;


    const user = new User(reqBody);

    try {
        await user.save();
        const token = createToken(user);
        res.cookie('userInfo', token, { httpOnly: true, maxAge: 60 * 60, sameSite: 'strict' }) //maxAge 1 hora
        res.status(200).json({ data: { user } });
    } catch (error) {
        const errorList = handleMongooseErros(error);
        res.status(400).json({ errors: errorList });
    }
};


export const login = async (req, res) => {

    //Token Authenticaton
    const cookies = req.cookies;
    if (cookies) {
        reqToken = cookies.userInfo;
        if (reqToken) {
            jwt.verify(reqToken, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(decoded);
                    //TODO: return user info                
                }
            })
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
        res.status(400).json({ errors: [{ param: 'email', message: 'Contraseña Incorrecta' }] });
        return;
    }
    //Response Token and User data 
    const token = createToken(user);
    res.cookie('userInfo', token, { httpOnly: true, maxAge: 60 * 60, sameSite: 'strict' }) //maxAge 1 hora
    res.status(200).json({ data: { user } });

};

export function logout(req, res) {
    res.cookie('userInfo', '', { maxAge: 1 });
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