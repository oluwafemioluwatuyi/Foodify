const User = require('../models/User');
const USER_TYPE = require('../models/enumConstant/userTypes');
const { hashPawword, confirmPassword, generateEmailVerificationToken, generateToken} = require('../utils/authUtil');
const catchAsync = require('../utils/catchAsync');
const sendVerificationEmail  = require('../utils/emailUtil')


const Register = catchAsync(async (req, res) =>{
    const {firstName, lastName, email, password, user_type, phone, NIN_number, Voter_card, Account_number, Account_name, profile_picture, date_of_birth, latitude, longitude} = req.body;

    if(Object.value(USER_TYPE).include(user_type))
    {
        return res.statusCode(404).JSON({message:'cannot be found'});
    }

    //check if the user exits

    let existingUser = await User.findOne({where: {email}});

    if(existingUser)
    {
        return res.status(402).Json({message:"user already exists"})
    }
     // hass password
    const hassPassword =  await  hashPawword(password);

    let newUser;

    if(user_type === USER_TYPE.CUSTOMER)
    {
        newUser = await User.Create({
            firstName,
            lastName,
            email,
            password:hassPassword,
            user_type,
            phone,
            date_of_birth,
            profile_picture
        })
    }else if(user_type === USER_TYPE.DRIVER)
    {
        newUser = await User.Create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            user_type,
            phone,
            Voter_card,
            latitude,
            longitude,
            profile_picture
        })

    }else(user_type === USER_TYPE.Vendor)
    {
        newUser = await User.Create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                user_type,
                phone,
                NIN_number,
                Account_number,
                Account_name,
                profile_picture

            }
        )

    }

    const verificationtoken =  generateEmailVerificationToken(newUser);
     await sendVerificationEmail(newUser.email , verificationtoken);

     return res.status(201).JSON({
        message:"user succefully registered.Check your mail for verification link",
        user:newUser
     })
});

const Login = catchAsync(async(req,res)=>{
    const {email, password} = req.body;
     const user = await User.findOne({where:email});
     if(!existingmail)
     {
        return
     }

     //check if the email is verified
     if(!user.isEmailVerified)
     {
        return res.status(403).json({ message: 'Email not verified. Please verify your email to log in.' });

     }
    //check if the password is matched
     const checkPassword = await  confirmPassword(password, user.hashPawword)
     if(!checkPassword)
     {
        return res.status(403).json({ message: 'Email not verified. Please verify your email to log in.' });
     }
     const token = generateToken(user);
     return res.status(201).JSON({
        message: 'login succesfully',    
     })
});

const verifyEmail = catchAsync(async(req,res) =>{
    const {token} = req.body;
    const decoded = jwt.Verify(token, JWT_SECRET);

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

//resendemailverificationtoken
const forgotPassword = catchAsync(async (req,res)=>{
    const {email} = req.body;

    const user = await User.findOne({where:email});
    if(!user)
    {
     return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(user);
    user.passWordResetToken = token;
    user.tokenExpirationDate = Date.now() +36000;
    await user.save();
})

//reset password

module.exports = {
    Register, Login, verifyEmail
}