module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      order_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      item_total: DataTypes.DECIMAL(10, 2)
    }, {});
    OrderItem.associate = function(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderItem.belongsTo(models.Menu, { foreignKey: 'menu_id' });
    };
    return OrderItem;
  };
  