module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING
    }, {});
    return Restaurant;
  };
  