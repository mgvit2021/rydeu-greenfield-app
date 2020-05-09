const express = require('express');
const _ = require('lodash');
const {FetchData} = require('./classFile');

//database connection
const db = require('./config/database');

//Test Database Connection
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:'+err));

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send({
        api: "/greenfield/v1/api"
    })
})

//Defined routes
app.use('/greenfield/v1/organizations',require('./routes/organizations'));
app.use('/greenfield/v1/vehicles',require('./routes/vehicles'));
app.use('/greenfield/v1/pricing',require('./routes/pricing'));

//Query validator middleware
function validateQuery(values) {
    return (req, res, next) => {
        for(const value of values) {
            if(!req.query[value]) { // Field isn't present, end request
                return res.status(400).send({
                    message : `${value} is missing`,
                    status : "error"
                });
            }
        }
        next();
    };
}

//Main API
app.get('/greenfield/v1/api', validateQuery(['city', 'organization_id', 'total_distance']),(req,res)=>{
    var query = req.query
    fd = new FetchData(query.organization_id,query.city,query.total_distance);
    fd.getAllOrgs()
    .then(data =>{
        if(data.length==0){
            return res.status(400).send({
                message:"No records found",
                status: "error"
            })
        }
        var vehicles=[];
        _.forEach(data,async (obj)=>{
            await vehicles.push(fd.getVehicle(obj.vehicle_id));
        })
        Promise.all(vehicles).then(values=>{
            var output =[];
            for(i=0;i<vehicles.length;i++){
                var obj ={};
                obj.vehcle_type = values[i].type;
                var price=fd.getTotalPrice(data[i].base_distance_in_km,data[i].km_price,data[i].fix_price)
                obj.total_price = price;
                output.push(obj);
                //console.log(output)
            }
            res.send(output);
        })
    })
    .catch(err=>{
        res.send({
            message: `Some error occured: ${err}`,
            status:"error"
        })
    })
});

app.all('/*',(req,res)=>{
    res.status(400).send({
        message: "Invalid Route",
        status: "error",
        api: "/greenfield/v1/api"
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT);