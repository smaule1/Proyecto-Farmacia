import User from '../model/userModel.js';
import mongoose from 'mongoose';




export const registrar = async (req, res) => {
    const reqBody = req.body;
    
    try{
        const user = new User(reqBody);       
        await user.save();
        res.status(200).json({success:true});
    }catch(error){                
        res.status(500).json({success:false, message: error.message});        
    }
};


export const login = async (req, res) => {    
    res.send('a');
};
