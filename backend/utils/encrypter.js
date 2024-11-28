import bcrypt from "bcrypt";

export const hashPassword = async(user) => {
    let salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);    
}

export const comparePassword = async (pass1, pass2) => {
    return await bcrypt.compare(pass1, pass2);
}