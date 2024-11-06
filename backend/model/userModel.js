import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Enum
const Rol = {
  Administrador: 'Administrador',
  Encargado: 'Encargado',
  Usuario: 'Usuario'  
};
Object.freeze(Rol);


//Schema
const userSchema = new mongoose.Schema({   
  nombreUsuario: {
    type: String,
    required:true
  },
  password: {
    type: String, 
    required:true
  },
  email: {
    type: String, 
    unique: true, 
    required:true
  },  
  rol: {
    type: String, 
    enum: Object.keys(Rol), //enum valida que el rol se encuentre dentro del array de Rol
    required:true
  },    
  puntos: {
    type: Number,
    required: true,
    default: 0 
  }
});

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
});



//Model
const User = mongoose.model('users', userSchema );

export default User;