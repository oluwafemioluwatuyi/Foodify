const {User} = require('../models/index.js');
const USER_TYPE = require('../models/enumConstant/userTypes');
const ControllerHelper = require('../Helpers/ControllerHelper');
const ResponseStatus = require('../Helpers/ResponseStatus');
const AppStatusCodes = require('../Helpers/AppStatusCode');
const { hashPawword, confirmPassword, generateEmailVerificationToken, generateToken} = require('../utils/authUtil');
const catchAsync = require('../utils/catchAsync');
const sendVerificationEmail  = require('../utils/emailUtil')


const Register = catchAsync(async (req, res) =>{
    const {firstName, lastName, email, password, user_type, phone, NIN_number, Voter_card, Account_number, Account_name, profile_picture, date_of_birth, latitude, longitude} = req.body;
    console.log(User);
    console.log(Object.keys(User));  // This should show methods like 'findOne', 'create', etc.

    console.log('User.findOne:', typeof User.findOne);
    if(!Object.values(USER_TYPE).includes(user_type))
    {
        return res.status(404).json({message:'cannot be found'});
    }

    //check if the user exits

    let existingUser = await User.findOne({where: {email}});

    if(existingUser)
    {
        return res.status(402).json({message:"user already exists"})
    }
     // hass password
    const hassPassword =  await  hashPawword(password);

    let newUser;

    if(user_type === USER_TYPE.CUSTOMER)
    {
        try {
            console.log('Creating user with data:', {
                firstName,
                lastName,
                email,
                password: hassPassword,
                user_type,
                phone,
                date_of_birth,
                profile_picture,
            });
        
            newUser = await User.create({
                firstName,
                lastName,
                email,
                password:hassPassword,
                user_type,
                phone: phone || null, // explicitly set to null if not provided
                date_of_birth, // ensure it's a Date object or null
                profile_picture: profile_picture || null,
                NIN_number: NIN_number || null,
                Voter_card: Voter_card || null,
                Account_number: Account_number || null,
                Account_name: Account_name || null,
                latitude: latitude || null,
                longitude: longitude || null,
            });
        
            console.log('User created successfully:', newUser);
        } catch (error) {
            console.error('Error creating user:', error); // Log the full error for context
            return res.status(500).json({ message: 'An error occurred while creating the user.', error });
        }
        
    }
    // else if(user_type === USER_TYPE.DRIVER)
    // {
    //     newUser = await User.create({
    //         firstName,
    //         lastName,
    //         email,
    //         password: hassPassword,
    //         user_type,
    //         phone,
    //         Voter_card,
    //         latitude,
    //         longitude,
    //         profile_picture
    //     })

    // }
    // else(user_type === USER_TYPE.Vendor)
    // {
    //     newUser = await User.create(
    //         {
    //             firstName,
    //             lastName,
    //             email,
    //             password: hassPassword,
    //             user_type,
    //             phone,
    //             NIN_number,
    //             Account_number,
    //             Account_name,
    //             profile_picture

    //         }
    //     )

    // }

    const verificationtoken =  generateEmailVerificationToken(newUser);
     await sendVerificationEmail(newUser.email , verificationtoken);
     console.log('Generated verification token:', verificationtoken);

     return ControllerHelper.handleApiResponse(
            res,
            ResponseStatus.Created,
            AppStatusCodes.Success,
            "User registered successfully",
            newUser
        );
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
     return ControllerHelper.handleApiResponse(
        res,
        ResponseStatus.Created,
        AppStatusCodes.Success,
        "User registered successfully",
        newUser
     )
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