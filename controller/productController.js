const productModel = require('../models/productSchema')

let createProduct = async function(req,res) {
    try{
        let data = req.body
        let create = await productModel.create(data)
        res.status(201).send({status : true , product : create})
    }catch(error){
        console.log(error),res.status(500).send({error : "Internal Server Error"})
    }
}


module.exports.createProduct=createProduct