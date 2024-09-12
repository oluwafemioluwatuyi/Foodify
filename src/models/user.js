const USER_TYPES = require('../models/enumConstant/userTypes');
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('user',{
        firstName: {type:DataTypes.STRING, allowNull: false},
        lastName:{ type:DataTypes.STRING, allowNull:false},
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING },
        user_type: DataTypes.ENUM(USER_TYPES),
        NIN_number: { type: DataTypes.STRING },
        Voter_card: { type: DataTypes.STRING },
        Account_number: { type: DataTypes.STRING },
        Account_name: { type: DataTypes.STRING },
        profile_picture: { type: DataTypes.STRING },
        date_of_birth: { type: DataTypes.DATE },
        latitude: { type: DataTypes.DECIMAL(9, 6) },
        longitude: { type: DataTypes.DECIMAL(9, 6) }
    });
    User.associate = function(models){
        User.hasOne(models.Wallet, {foreignKey: "userId"})
        User.hasMany(models.Order, {foreignKey:"userId"})
        User.hasMany(models.Rating, { foreignKey: 'user_id' });
        User.hasMany(models.Address, { foreignKey: 'user_id' });
    }
    return User;
}