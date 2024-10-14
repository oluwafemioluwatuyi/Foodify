module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      order_total: DataTypes.DECIMAL(10, 2),
      delivery_status: DataTypes.STRING
    }, {});

    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
    return Order;
  };
  