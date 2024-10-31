import User from '../model/userModel.js';
import mongoose from 'mongoose';




export const registrar = async (req, res) => {
    const reqBody = req.body;

    /*
    if(!reqBody.nombreUsuario || !reqBody.email || !reqBody.password || !reqBody.rol){
        return res.status(400).json({success:false, message:'Información incompleta'});        
    }
*/
    

    try{
        const user = new User(reqBody);
        await user.save();
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
    
};
