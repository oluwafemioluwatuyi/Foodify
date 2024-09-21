'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config.json')['development'];
const db = {};

let sequelize;

try {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mssql',
    port: 1433,
    dialectModule: require('tedious'),  // Tedious explicitly required
    dialectOptions: config.dialectOptions,
    logging: console.log  // Enable logging to trace SQL statements
  });

  console.log('Sequelize instance created successfully.');
} catch (error) {
  console.error('Error initializing Sequelize:', error);
}

// Auto-load models
fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== path.basename(__filename))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log('Loaded models:', Object.keys(db));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
