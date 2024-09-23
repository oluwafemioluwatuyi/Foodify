'use strict';

const permission_type = require('../src/models/enumConstant/permissionAction');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      {
        permissionAction: permission_type[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionAction: permission_type[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionAction: permission_type[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionAction: permission_type[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
