const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Organization = require('../models/Organization');
const Vehicle = require('../models/Vehicle');
const Pricing = require('../models/Pricing');
const {Validator} = require('../classFile');
const validate = new Validator();
//database connection
//const db = require('../config/database');


router.get('/',(req,res)=>{
    Vehicle.findAll()
    .then((vehicles)=>{
        res.send(vehicles);
    })
    .catch(err => console.log(err))
});

router.post('/',(req,res)=>{
    
    //Joi validation
    var {error,value} = validate.vehicleValidate(req.body);
    //error in validation
    if(error){
        console.log(req.body)
      return res.status(400).send({
            message: error.details[0].message,
            status: "error"
        });
    }
    
    //const {id,name} = req.body;
    //Insert
    Vehicle.create(req.body)
    .then(vehicle => {
        res.status(201).send({
            message: "New vehicle added",
            status: "success"
        })
    })
    .catch(err => {
        res.status(400).send({
            message: err.errors[0].message,
            status: "error"
        })
    })
});

router.get('/:id',(req,res)=>{
    var id = req.params.id;
    Vehicle.findOne({
        where: {id}
    })
    .then(data=> {
        if(data==null){
            return res.status(400).send({
                message:"Vehicle does not exists",
                status: "not found"
            })
        }
        res.status(200).send(data)
    })
    .catch(err => console.log(err))
})

module.exports = router;