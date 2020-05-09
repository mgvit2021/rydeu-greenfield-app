const Sequelize = require('sequelize');
const db = require('../config/database');

const Vehicle = db.define('vehicle',{
    type:{
        type : Sequelize.STRING
    },
    description:{
        type : Sequelize.TEXT
    }
});

module.exports = Vehicle;