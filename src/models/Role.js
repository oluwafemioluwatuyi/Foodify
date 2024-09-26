module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, // Set to true if you want this field to be optional
      },
    }, {
      // Additional options can be added here
    });
    
    // Role.associate = (models) => {
    //   Role.belongsToMany(models.User, { through: 'UserRoles' });
    //   Role.hasMany(models.Permission); // Assuming Permission model is defined
    // };
  
    return Role;
  };
  