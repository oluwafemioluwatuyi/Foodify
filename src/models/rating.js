module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    }, {});
    // Rating.associate = function(models) {
    //   Rating.belongsTo(models.User, { foreignKey: 'user_id' });
    //   Rating.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    // };
    return Rating;
  };
  