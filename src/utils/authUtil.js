const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const catchAsync = require('./catchAsync');

const hashPawword = async(password) =>{
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
}

const confirmPassword = async(passsword, hashPawword)=>{

    return await bcrypt.compare(passsword, hashPawword)
}

const generateEmailVerificationToken =catchAsync(async(user)=>{
    const signUp = promisify(jwt.sign);   
    
        const token = await signUp(
            {
                id:user.id,
                email:user.email,
                password:user.password
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT-EXPIRES_IN
            }
            
        )
        return token;
   
});

const generateToken = catchAsync(async (user) => {
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
});


module.exports = {
    hashPawword, confirmPassword, generateEmailVerificationToken, generateToken
};


