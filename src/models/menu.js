module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      restaurant_id: DataTypes.INTEGER,
      item_name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2)
    }, {});
    return Menu;
  };
  