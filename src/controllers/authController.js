const userModel = require('../models/User');
const USER_TYPE = require('../models/enumConstant/userTypes');
const {hassPassword, comparePassword, generateToken} = require('../utils/authUtil')


const Register = async (req, res) =>{
    const {firstName, lastName, email, password, user_type, phone, NIN_number, Voter_card, Account_number, Account_name, profile_picture, date_of_birth, latitude, longitude} = req.body;

    if(Object.value(USER_TYPE).include(user_type))
    {
        return res.statusCode(404).JSON({message:'cannot be found'});
    }


}
