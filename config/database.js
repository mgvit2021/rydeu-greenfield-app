const Sequelize = require('sequelize');
module.exports = new Sequelize('greenfield', 'postgres', '1259', {
    host: 'localhost',
    dialect: 'postgres'
});
