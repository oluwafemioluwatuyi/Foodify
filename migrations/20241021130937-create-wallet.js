'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      WalletReference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      WalletName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CustomerName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      BvnDetails: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CustomerEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Nin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CurrencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Wallets');
  }
};
