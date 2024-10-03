const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const catchAsync = require('./catchAsync');

require('dotenv').config();  // Load .env variables


const hashPassword = async(password) =>{
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
}

const confirmPassword = async(password, hashPassword)=>{

    return await bcrypt.compare(password, hashPassword)
}

const generateEmailVerificationToken =async(user)=>{
    const signUp = promisify(jwt.sign);   
    
        const token = await signUp(
            {
                id:user.id,
                email:user.email,
                password:user.password
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
            
        )
        return token;
   
};

const generateToken = async (user) => {
    const signUp = promisify(jwt.sign);   

    const token = await signUp(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return token;
};


module.exports = {
    hashPassword, confirmPassword, generateEmailVerificationToken, generateToken
};


