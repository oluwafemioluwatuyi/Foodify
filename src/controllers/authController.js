const User = require('../models/User');
const USER_TYPE = require('../models/enumConstant/userTypes');
const { hashPawword, confirmPassword, generateEmailVerificationToken, generateToken} = require('../utils/authUtil')
const sendVerificationEmail  = require('../utils/emailUtil')


const Register = async (req, res) =>{
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

}

const login = async(req,res)=>{
    const {email, password} = req.body;
     const user = await User.findOne({where:email});
     if(!existingmail)
     {
        return
     }

     //check if the email is verified

    //check if the password is matched
     const checkPassword = await  confirmPassword(password, user.hashPawword)
     if(!checkPassword)
     {
        return
     }

     const token = generateToken(user);

     return res.status(201).JSON({
        message: 'login succesfully',
    
     })

}

