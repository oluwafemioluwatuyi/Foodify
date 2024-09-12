module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING
    }, {});
    Restaurant.associate = function(models) {
      Restaurant.hasMany(models.Order, { foreignKey: 'restaurant_id' });
      Restaurant.hasMany(models.Rating, { foreignKey: 'restaurant_id' });
      Restaurant.hasMany(models.Menu, { foreignKey: 'restaurant_id' });
    };
    return Restaurant;
  };
  