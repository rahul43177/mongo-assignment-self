const userModel = require('../models/userModel')

let totalSales = async function(req,res) {
    try {
       let allAuthors = await userModel.aggregate([
        {$group : {_id : "$name" , totalSale  : {$sum : "$sales"}}} ,
        {$sort : {totalSale : -1}}
       ])
       res.send({status : true , data : allAuthors})
    } catch(error) {
        console.log(error)
        res.status(500).send({error : "Internal server error"})
    }
}


module.exports.totalSales=totalSales