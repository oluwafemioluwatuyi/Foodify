module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      order_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      item_total: DataTypes.DECIMAL(10, 2)
    }, {});
    return OrderItem;
  };
  