module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      order_total: DataTypes.DECIMAL(10, 2),
      delivery_status: DataTypes.STRING
    }, {});
    Order.associate = function(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
      Order.hasOne(models.Payment, { foreignKey: 'order_id' });
    };
    return Order;
  };
  