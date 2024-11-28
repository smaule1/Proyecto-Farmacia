import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
    try{ 
        return jwt.verify(reqToken, process.env.JWT_PRIVATE_KEY);
    }catch(err){
        throw err;
    }    
}

export function createToken(user) {
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
