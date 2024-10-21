'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('WalletProvider', [
      {
        id: 'a3bb189e-8bf9-3888-9912-ace4e6543002',
        name: 'Monnify',
        slug: 'monnify',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WalletProvider', {
      id: 'a3bb189e-8bf9-3888-9912-ace4e6543002' 
    }, {});
  }
};
