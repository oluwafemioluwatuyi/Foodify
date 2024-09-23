const permission_type = require('../models/enumConstant/permissionAction');
module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      permissionAction: {
        type: DataTypes.ENUM(...permission_type),
        allowNull: false,
        unique: true, // Ensuring each permission action is unique
      },
    }, {});
  
    Permission.associate = (models) => {
      Permission.belongsToMany(models.Role, { through: 'RolePermissions', foreignKey: 'permissionId' });
    };
  
    return Permission;
  };
  