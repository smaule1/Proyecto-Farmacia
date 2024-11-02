import User from '../model/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";



export const registrar = async (req, res) => {
    const reqBody = req.body;

    
    const user = new User(reqBody);

    try{    
        await user.save();
        const token = jwt.sign(
            {
                _id: user._id,
                nombreUsuario: user.nombreUsuario,
                rol: user.rol
            },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "15m"}
        );          
        res.cookie('userInfo', token, {httpOnly:true, maxAge: 60*60, sameSite:Strict}) //maxAge 1 hora
        res.status(200).json({data: user._id});
    }catch(error){                        
        if(error.code === 11000){
            const message = `Ya existe un usario registrado con ese email`
            res.status(400).json({success:false, message: message});        
        }else{
            res.status(400).json({success:false, message: error.message});        
        }
        
    }
};


export const login = async (req, res) => {    
    const {email, password} = req.body;

    //TODO: validation
    
    const user = await User.findOne({'email': email});    
    if(!user){
        res.status(400).json({success:false, message: 'El correo electónico no está registrado.'});
        return;    
    }    
    const auth = await bcrypt.compare(password, user.password);    
    if(!auth){
        res.status(400).json({success:false, message: 'Contraseña incorrecta'});
        return;
    }

    res.status(200).json({data: user._id});



};
