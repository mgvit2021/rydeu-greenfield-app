const Sequelize = require('sequelize');
const db = require('../config/database');

const Organization = db.define('organization',{
    name:{
        type : Sequelize.STRING
    }
});

module.exports = Organization;