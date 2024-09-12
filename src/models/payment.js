module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      order_id: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      amount: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING
    }, {});
    Payment.associate = function(models) {
      Payment.belongsTo(models.Order, { foreignKey: 'order_id' });
    };
    return Payment;
  };
  