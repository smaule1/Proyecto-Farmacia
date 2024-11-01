import User from '../model/userModel.js';
import mongoose, { trusted } from 'mongoose';
import jwt from 'jsonwebtoken';




export const registrar = async (req, res) => {
    const reqBody = req.body;

    /*
    if(!reqBody.nombreUsuario || !reqBody.email || !reqBody.password || !reqBody.rol){
        return res.status(400).json({success:false, message:'Información incompleta'});        
    }
*/
    console.log("aaa");
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
        res.cookie('userInfo', token, {httpOnly:true, maxAge: 60*60, sameSite: 'none', secure:true}) //maxAge 1 hora
        res.status(200).json({success:true});
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
    res.cookie('sessionId', '12345678', {
        // "expires" - The cookie expires in 24 hours
        expires: new Date(Date.now() + 86400000), 
        // "path" - The cookie is accessible for APIs under the '/api' route
        path: '/', 
        // "domain" - The cookie belongs to the 'example.com' domain
        //domain: 'localhost', 
        // "secure" - The cookie will be sent over HTTPS only
        secure: true, 
        // "HttpOnly" - The cookie cannot be accessed by client-side scripts
        httpOnly: true
      });
    res.send("xd");    
};
