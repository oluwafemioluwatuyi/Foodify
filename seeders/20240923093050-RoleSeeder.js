'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        description: 'Administrator with full access',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Customer',
        description: 'Regular customer with limited access',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vendor',
        description: 'Vendor with permissions to manage products',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Driver',
        description: 'Driver with permissions to delivery products',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
