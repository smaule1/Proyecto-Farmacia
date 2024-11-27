import mongoose from "mongoose";

//Enum
const Rol = {
  Administrador: 'Administrador',
  Encargado: 'Encargado',
  Usuario: 'Usuario',
  Farmacia: 'Farmacia'
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

//Model
const User = mongoose.model('users', userSchema );

export default User;