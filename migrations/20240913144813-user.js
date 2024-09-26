'use strict';

const USER_TYPES = require('../src/models/enumConstant/userTypes');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      user_type: {
        type: Sequelize.ENUM(...Object.values(USER_TYPES)), // Adjust based on USER_TYPES
        allowNull: true,
      },
      NIN_number: {
        type: Sequelize.STRING,
      },
      Voter_card: {
        type: Sequelize.STRING,
      },
      Account_number: {
        type: Sequelize.STRING,
      },
      Account_name: {
        type: Sequelize.STRING,
      },
      profile_picture: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

    })
  },

  down: async (queryInterface, Sequelize) => {

      // Drop tables that reference Users first
      await queryInterface.dropTable('Wallets'); // Adjust if the table name is different
      await queryInterface.dropTable('Orders'); // Adjust if the table name is different
      await queryInterface.dropTable('Ratings'); // Adjust if the table name is different
      await queryInterface.dropTable('Addresses'); // Adjust if the table name is different
      
      // Now drop the Users table
      await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Users');
  }
};
