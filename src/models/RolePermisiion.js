

module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id',
        },
      },
    }, {});
  
    return RolePermission;
  };
  