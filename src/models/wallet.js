module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
      user_id: DataTypes.INTEGER
    }, {});
    Wallet.associate = function(models) {
      Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
      Wallet.hasMany(models.ManagedWallet, { foreignKey: 'wallet_id' });
    };
    return Wallet;
  };
  