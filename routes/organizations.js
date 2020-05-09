const router = require('express').Router();
const Organization = require('../models/Organization');
const {Validator} = require('../classFile');
const validate = new Validator();

router.get('/',(req,res)=>{
    Organization.findAll()
    .then((orgs)=>{
        res.send(orgs);
    })
    .catch(err => console.log(err))
});

router.post('/',(req,res)=>{
    
    //Joi validation
    var {error,value} = validate.orgValidate(req.body);
    //error in validation
    if(error){
        console.log(req.body)
      return res.status(400).send({
            message: error.details[0].message,
            status: "error"
        });
    }
    
    //Insert
    Organization.create(req.body)
    .then(org => {
        res.status(201).send({
            message: "New organization added",
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

router.get('/:id',(req,res)=>{
    var id = req.params.id;
    Organization.findOne({
        where: {id}
    })
    .then(data=> {
        if(data==null){
            return res.status(400).send({
                message:"Organization does not exists",
                status: "not found"
            })
        }
        res.status(200).send(data)
    })
    .catch(err => console.log(err))
})

module.exports = router;