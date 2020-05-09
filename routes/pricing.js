const router = require('express').Router();
const Pricing = require('../models/Pricing');
const {Validator} = require('../classFile');
const validate = new Validator();

router.get('/',(req,res)=>{
    Pricing.findAll()
    .then((pricing)=>{
        res.send(pricing);
    })
    .catch(err => console.log(err))
});

router.post('/',(req,res)=>{
    
    //Joi validation
    var {error,value} = validate.pricingValidate(req.body);
    //error in validation
    if(error){
      console.log(req.body)
      return res.status(400).send({
            message: error.details[0].message,
            status: "error"
        });
    }
    //Create a new Pricing
    Pricing.create(req.body)
    .then(pricing => {
        res.status(201).send({
            message: "New pricing added",
            status: "success"
        })
    })
    .catch(err => {
        res.status(400).send({
            message: err.errors[0].message,
            status: "error"
        })
    })
})



module.exports = router;