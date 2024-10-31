import mongoose from "mongoose";


//Enum
const Rol = {
  Administrador: 'Administrador',
  Encargado: 'Encargado',
  Usuario: 'Usuario'  
};
Object.freeze(Rol);


//Schema
const userSchema = new mongoose.Schema({   
  nombreUsuario: {type: String, required:true},
  password: {type: String, required:true},
  email: {type: String, unique: true, required:true},  
  rol: {type: String, enum: Object.keys(Rol), required:true}    //enum valida que el rol se encuentre dentro del array de Rol
});



//Model
const User = mongoose.model('users', userSchema );

export default User;