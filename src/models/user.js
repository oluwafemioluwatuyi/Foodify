'use strict';

const USER_TYPES = require('./enumConstant/userTypes');
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User',{
        firstName: {type:DataTypes.STRING, allowNull: false},
        lastName:{ type:DataTypes.STRING, allowNull:false},
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING },
        isEmailVerified: {type:DataTypes.BOOLEAN,allowNull: true,},
        emailVerificationToken: {type:DataTypes.STRING(512),allowNull: true,},
        passwordResetToken: {type:DataTypes.STRING,allowNull: true,},
        tokenExpirationDate: {type:DataTypes.DATE,allowNull: true,},
        user_type:{type: DataTypes.ENUM(...Object.values(USER_TYPES)), allowNull: false},
        NIN_number: { type: DataTypes.STRING,allowNull: true, },
        Voter_card: { type: DataTypes.STRING,allowNull: true, },
        Account_number: { type: DataTypes.STRING,allowNull: true, },
        Account_name: { type: DataTypes.STRING,allowNull: true, },
        profile_picture: { type: DataTypes.STRING,allowNull: true, },
        date_of_birth: { type: DataTypes.DATE, allowNull: true, },
        latitude: { type: DataTypes.DECIMAL(9, 6),allowNull: true, },
        longitude: { type: DataTypes.DECIMAL(9, 6),allowNull: true, }
    });
    User.associate = (models) => {
        User.belongsTo(models.Wallet, { foreignKey: 'walletId', as: 'wallet' });
        User.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    };
    
    return User;
}

  