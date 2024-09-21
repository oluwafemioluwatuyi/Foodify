module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        allowNull: false,
      }
    }, {});
  
    return UserRole;
  };
  