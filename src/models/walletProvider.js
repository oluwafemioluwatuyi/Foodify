// models/walletProvider.js
module.exports = (sequelize, DataTypes) => {
    const WalletProvider = sequelize.define('WalletProvider', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  
    return WalletProvider;
  };
  