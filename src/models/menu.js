module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      restaurant_id: DataTypes.INTEGER,
      item_name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2)
    }, {});
    Menu.associate = function(models) {
      Menu.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    };
    return Menu;
  };
  