const {User} = require('../models/index.js');
const USER_TYPE = require('../models/enumConstant/userTypes');
const ControllerHelper = require('../Helpers/ControllerHelper.js');
const ResponseStatus = require('../Helpers/ResponseStatus');
const AppStatusCodes = require('../Helpers/AppStatusCode');
const {hashPassword, confirmPassword, generateEmailVerificationToken, generateToken} = require('../utils/authUtil');
const catchAsync = require('../utils/catchAsync');
const sendVerificationEmail  = require('../utils/emailUtil');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');



const Register = catchAsync(async (req, res) =>{
        const { firstName, lastName, email, password, user_type, phone, NIN_number, Voter_card, Account_number, Account_name, profile_picture, date_of_birth, latitude, longitude } = req.body;

        if (!Object.values(USER_TYPE).includes(user_type)) {
            return res.status(404).json({ message: 'Cannot be found' });
        }

        // Check if the user exists
        let existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(402).json({ message: "User already exists" });
        }

        // Hash password

        const hashedPassword = await hashPassword(password);
        switch (user_type) {
            case USER_TYPE.CUSTOMER:
                newUser = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    user_type,
                    phone: phone || null,
                    date_of_birth,
                    profile_picture: profile_picture || null,
                });
                break;
            case USER_TYPE.DRIVER:
                newUser = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    user_type,
                    phone: phone || null,
                    Voter_card: Voter_card || null,
                    latitude: latitude || null,
                    longitude: longitude || null,
                    profile_picture: profile_picture || null,
                });
                break;
            case USER_TYPE.VENDOR:
                newUser = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    user_type,
                    phone: phone || null,
                    NIN_number: NIN_number || null,
                    Account_number: Account_number || null,
                    Account_name: Account_name || null,
                    profile_picture: profile_picture || null,
                });
                break;
            default:
        }


        // Generate email verification token
        const verificationToken = await generateEmailVerificationToken(newUser);
        await newUser.update({emailVerificationToken:verificationToken});
        await sendVerificationEmail(newUser.email, verificationToken);
        console.log(verificationToken);

        return res.status(201).json({ message: 'found' });

        // Return response
        // return ControllerHelper.handleApiResponse(
        //     res,
        //     ResponseStatus.Created,
        //     AppStatusCodes.Success,
        //     "User registered successfully"
        
        // );
});

const Login = catchAsync(async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({ 
        where: { 
          email: { [Op.eq]: email } 
        }
      });
     if(!user)
     {
         return res.status(404).json({ message: 'User not found. Please check your credentials.' });
     }

     //check if the email is verified
     if(!user.isEmailVerified)
     {
        return res.status(403).json({ message: 'Email not verified. Please verify your email to log in.' });

     }
    //check if the password is matched
     const checkPassword = await  confirmPassword(password, user.password)
     if(!checkPassword)
     {
        return res.status(403).json({ message: 'Email not verified. Please verify your email to log in.' });
     }
     const token = await generateToken(user);
    
     return res.status(200).json({ 
        message: 'Login successful', 
        token
      });
    //  return ControllerHelper.handleApiResponse(
    //     res,
    //     ResponseStatus.Created,
    //     AppStatusCodes.Success,
    //     "User registered successfully",
    //     newUser
    //  )
});

const verifyEmail = catchAsync(async(req,res) =>{
    const {token} = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if(!user)
    {
        return res.status(404).JSON({message:'user not found'})
    }
    if(user.isEmailVerified)
    {
        return res.status(400).json({ message: 'Email already verified' });
    }

    if(user.emailVerificationToken < new Date)
    {
        return 

    }
    user.isEmailVerified = true;
    user.emailVerificationToken =null;
    user. tokenExpirationDate =null;

     await user.save();

     return res.status(200).json({ message: 'Email successfully verified' });
})


const forgotPassword = async (req,res)=>{
    const {email} = req.body;

    const user = await User.findOne({ 
        where: { 
          email: { [Op.eq]: email } 
        }
      });
    if(!user)
    {
     return res.status(404).json({ message: 'User not found' });
    }
    const token = await generateToken(user);
    user.passwordResetToken = token;
    user.tokenExpirationDate = Date.now() +36000;
    await user.save();
    return res.status(200).json({ message: 'Password reset token generated successfully', token });
}

const resetPassword = catchAsync(async (req, res)=>{
    const {token, newPassword} = req.body;

    //decode the token and find the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if(!user ||user.tokenExpirationDate < Date.now()){
        return res.status(400).json({ message: 'Token is invalid or has expired' });
    }
    user.password = await hashPawword(newPassword);
    user.passWordResetToken =null;
    user.tokenExpirationDate = null;
    await user.save();
})

module.exports = {
    Register, Login, verifyEmail, forgotPassword, resetPassword
}