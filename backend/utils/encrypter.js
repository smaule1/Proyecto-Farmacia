import bcrypt from "bcrypt";

export const hashPassword = async(user) => {
    let salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);    
}