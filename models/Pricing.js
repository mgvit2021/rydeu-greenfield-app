const Sequelize = require('sequelize');
const db = require('../config/database');

const Pricing = db.define('pricing',{
    orgId:{
        type : Sequelize.INTEGER
    },
    vehicle_id:{
        type : Sequelize.INTEGER
    },
    city:{
        type : Sequelize.STRING
    },
    base_distance_in_km:{
        type : Sequelize.INTEGER
    },
    km_price:{
        type : Sequelize.INTEGER
    },
    fix_price:{
        type : Sequelize.INTEGER
    }

});

module.exports = Pricing;