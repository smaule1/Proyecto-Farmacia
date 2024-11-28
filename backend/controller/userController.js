import User from '../model/userModel.js';
import { 
    decodeToken,
    createToken
 } from '../utils/jwt.js';
import bcrypt from "bcrypt";
import {
    registrarUsuario,
    getUsernameById,
    getUser
} from '../logic/userLogic.js';


const MAX_AGE = 1000 * 60 * 60;

export const registrar = async (req, res) => {
    const reqBody = req.body;

    try {
        const user = await registrarUsuario(reqBody);
        const token = createToken(user);
        res.cookie('userInfo', token, { httpOnly: true, maxAge: MAX_AGE, sameSite: 'strict' }) //maxAge 1 hora
        res.status(200).json({ data: { user } });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const points = await User.find({ email: email }, 'puntos');

        res.send(points);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener puntos');
    }
}

export const login = async (req, res) => {

    //Token Authenticaton
    const reqToken = req.cookies.userInfo;
    if (reqToken) { //ReqToken se encuentra en los cookies            
        try {
            const decodedToken = decodeToken(reqToken);  //ReqToken es válido                                     
            const user = await getUser(decodedToken._id);
            const token = createToken(user);
            //Enviar token fresco al usuario
            res.cookie('userInfo', token, { httpOnly: true, maxAge: MAX_AGE, sameSite: 'strict' })
            res.status(200).json({ data: { user } });
            return;
        } catch (err) {            
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
        const user = await getUsernameById(id);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el email');
    }
}




