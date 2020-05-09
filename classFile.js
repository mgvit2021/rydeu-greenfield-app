const joi = require('@hapi/joi');
const Vehicle = require('./models/Vehicle');
const Pricing = require('./models/Pricing');

class Validator {
    /* validate body on product post */
    orgValidate(data){
        
        const schema=joi.object({
            'id': joi.number().integer().optional(),
            'name': joi.string().required()
        });
        
        return schema.validate(data); //returns {error,value} after validation
    }
    vehicleValidate(data){
        const schema=joi.object({
            'id': joi.number().optional(),
            'type': joi.string().required(),
            'description': joi.string().optional()
        });
        
        return schema.validate(data); //returns {error,value} after validation
    }
    pricingValidate(data){

        const schema=joi.object({
            'id': joi.number().integer().optional(),
            'orgId': joi.number().integer().required(),
            'vehicle_id': joi.number().integer().required(),
            'city': joi.string().required(),
            'base_distance_in_km': joi.number().integer().required(),
            'km_price': joi.number().integer().required(),
            'fix_price': joi.number().integer().required()
        });
        
        return schema.validate(data); //returns {error,value} after validation
    }

    pricingUpdate(data){

        const schema=joi.object({
            'orgId': joi.number().integer().optional(),
            'vehicle_id': joi.number().integer().optional(),
            'city': joi.string().optional(),
            'base_distance_in_km': joi.number().integer().optional(),
            'km_price': joi.number().integer().optional(),
            'fix_price': joi.number().integer().optional()
        });
        
        return schema.validate(data); //returns {error,value} after validation
    }

}
//Main class for data-fetching and calculation
class FetchData {
    constructor(orgId,city,totalKm){
        this.orgId = orgId;
        this.city = city;
        this.totalKm = totalKm;
    }
    getAllOrgs(){
        let orgId = this.orgId;
        let city = this.city;
        //return all records with orgId and city
        return Pricing.findAll({
            where: {orgId,city}
        })
    }
    async getVehicle(id){
       return await Vehicle.findOne({
            where: {id}
        });
    }
    
    //Price calculation function
    getTotalPrice(base_distance_in_km,km_price,fix_price){
        var totalKm = this.totalKm;
        if(totalKm<=base_distance_in_km){
            return fix_price;
        }else{
            return (totalKm-base_distance_in_km)*km_price + fix_price;
        }
    }
}

module.exports = {Validator,FetchData};
