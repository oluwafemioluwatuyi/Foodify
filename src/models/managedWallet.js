module.exports = (sequelize, DataTypes) => {
    const ManagedWallet = sequelize.define('ManagedWallet', {
      user_id: DataTypes.INTEGER,
      external_wallet_id: DataTypes.STRING
    }, {});
    ManagedWallet.associate = function(models) {
      ManagedWallet.belongsTo(models.Wallet, { foreignKey: 'wallet_id' });
      ManagedWallet.hasMany(models.WalletTransaction, { foreignKey: 'managed_wallet_id' });
    };
    return ManagedWallet;
  };
  