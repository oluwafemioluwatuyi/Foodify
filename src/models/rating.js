module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    }, {});
    return Rating;
  };
  