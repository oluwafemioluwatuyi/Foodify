module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
      user_id: DataTypes.INTEGER,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      pincode: DataTypes.INTEGER
    }, {});
    Address.associate = function(models) {
      Address.belongsTo(models.User, { foreignKey: 'user_id' });
    };
    return Address;
  };
  