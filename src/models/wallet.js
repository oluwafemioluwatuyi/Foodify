module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    WalletReference: {
      type: DataTypes.STRING,
      allowNull: true
    },
    WalletName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CustomerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    BvnDetails: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    CustomerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    Nin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CurrencyCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Wallet.associate = function(models) {
    Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Wallet;
};
