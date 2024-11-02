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
        if (error.code === 11000) {
            const message = `Ya existe un usario registrado con ese email`
            res.status(400).json({ success: false, message: message });
        } else {
            res.status(400).json({ success: false, message: error.message });
        }

    }
};


export const login = async (req, res) => {

    //Token Authenticaton

    const cookies = req.cookies;
    if (cookies) {
        reqToken = cookies.userInfo;
        if (reqToken){
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
        res.status(400).json({ message: 'Missing parameters in request body' });
        return;
    }
    //Get User by Email
    const user = await User.findOne({ 'email': email });
    if (!user) {
        res.status(400).json({ success: false, message: 'El correo electónico no está registrado.' });
        return;
    }
    //Check Password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        return;
    }
    //Response Token and User data 
    const token = createToken(user);
    res.cookie('userInfo', token, { httpOnly: true, maxAge: 60 * 60, sameSite: 'strict' }) //maxAge 1 hora
    res.status(200).json({ data: { user } });

};

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
