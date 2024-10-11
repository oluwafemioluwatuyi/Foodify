const {User} = require('../models/index.js');
const USER_TYPE = require('../models/enumConstant/userTypes');
const ControllerHelper = require('../Helpers/ControllerHelper.js');
const ResponseStatus = require('../Helpers/ResponseStatus');
const UserDTO = require('../dtos/user.dto.js');
const {hashPassword, confirmPassword, generateEmailVerificationToken, generateToken} = require('../utils/authUtil');
const catchAsync = require('../utils/catchAsync');
const sendVerificationEmail  = require('../utils/emailUtil');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');



const Register = catchAsync(async (req, res) =>{
        const { firstName, lastName, email, password, user_type, phone, NIN_number, Voter_card, Account_number, Account_name, profile_picture, date_of_birth, latitude, longitude } = req.body;

        if (!Object.values(USER_TYPE).includes(user_type)) {
            return ControllerHelper.handleApiResponse(res, null, ResponseStatus.BadRequest, 'Cannot be found');
        }

        // Check if the user exists
        let existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return ControllerHelper.handleApiResponse(res, null, ResponseStatus.Error, "User already exists");
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

        // Create User DTO
    const userDto = new UserDTO({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        dateOfBirth: newUser.date_of_birth,
        userType: newUser.user_type,
        profilePicture: newUser.profile_picture,
    });

        return ControllerHelper.handleApiResponse(res, userDto.toJson(), ResponseStatus.Created, 'User registered successfully');
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
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.NotFound, 'User not found. Please check your credentials.');
     }

     if(!user.isEmailVerified)
     {
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.Unauthorized, 'Email not verified. Please verify your email to log in.');

     }
    //check if the password is matched
     const checkPassword = await  confirmPassword(password, user.password)
     if(!checkPassword)
     {
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.Unauthorized, 'Invalid credentials.');
     }
     const token = await generateToken(user);
 // Create User DTO
 const userDto = new UserDTO({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.date_of_birth,
    userType: user.user_type,
    profilePicture: user.profile_picture,
});
    return ControllerHelper.handleApiResponse(res, { user: userDto.toJson(), token }, ResponseStatus.Success, 'User logged in successfully');
});

const verifyEmail = catchAsync(async(req,res) =>{
    const {token} = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if(!user)
    {
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.NotFound, 'User not found');
    }
    if(user.isEmailVerified)
    {
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.BadRequest, 'Email already verified');
    }

    if(user.emailVerificationToken < new Date)
    {
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.BadRequest, 'Verification token has expired. Please request a new one.'); 

    }
    user.isEmailVerified = true;
    user.emailVerificationToken =null;
    user. tokenExpirationDate =null;

     await user.save();

     return ControllerHelper.handleApiResponse(res, null, ResponseStatus.Success, 'Email successfully verified');
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
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.NotFound, 'User not found');
    }
    const token = await generateToken(user);
    user.passwordResetToken = token;
    user.tokenExpirationDate = Date.now() +36000;
    await user.save();
    return ControllerHelper.handleApiResponse(res, token, ResponseStatus.Success, 'Password reset token generated successfully');
}

const resetPassword = async (req, res)=>{
    const {token, password} = req.body;

    //decode the token and find the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if(!user ||user.tokenExpirationDate < Date.now()){
        return ControllerHelper.handleApiResponse(res, null, ResponseStatus.BadRequest, 'Token is invalid or has expired');
    }
    user.password = await hashPassword(password);
    user.passWordResetToken =null;
    user.tokenExpirationDate = null;
    await user.save();
    return ControllerHelper.handleApiResponse(res, null, ResponseStatus.Success, 'Password reset successfully');
}

module.exports = {
    Register, Login, verifyEmail, forgotPassword, resetPassword
}