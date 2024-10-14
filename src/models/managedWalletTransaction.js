module.exports = (sequelize, DataTypes) => {
    const WalletTransaction = sequelize.define('WalletTransaction', {
      managed_wallet_id: DataTypes.INTEGER,
      transaction_reference: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      fee: DataTypes.DECIMAL,
      transaction_type: DataTypes.ENUM('deposit', 'withdrawal', 'payment'),
      narration: DataTypes.STRING,
      is_credit: DataTypes.BOOLEAN,
      status: DataTypes.STRING
    }, {});
    return WalletTransaction;
  };
  