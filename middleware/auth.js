const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const productModel = require('../models/productSchema')

let headervalidation =  function(req,res,next) {
    try {
        let header = req.headers['isFreeAppUser']
        if(!header)  return res.status(404).send({status : false , error : "Header is not present"})
        else {
            req.body.isFreeAppUser = header
            next()
        }
    }catch(error) {
        console.log(error)
        res.status(500).send({error : "Internal server error"})
    } 
}

let authorProductCheck =  function(req,res,next){ 
    try {
        let userId = req.body.userId
        let productId = req.body.productId
        if(!mongoose.isValidObjectId(userId)){
            res.status(404).send({error : "Invalid UserId"})
        }
        else if(!mongoose.isValidObjectId(productId)) {
            res.status(404).send({error : "Invalid Product ID "})
        }
        else { 
            next()
        }
    }catch(error){ 
        console.log(error.message)
        res.status(500).send({error : "Internal server error"})
    }
}

let exist = async function(req,res,next) {
    try {
        let userId = req.body.userId
        let productId = req.body.productId
        let user = await userModel.findById(userId)
        let product = await productModel.findById(productId)
        if(!user || !product) {
            if(!user)   return res.status(404).status({error : "User is not present which you asking"})
            else {
                return res.status(404).send({error : "Product is not present"})
            }
        }
    }catch(error){ 
        console.log(error.message)
        res.status(500).send({error : "Internal server error"})
    }
}

module.exports.headervalidation=headervalidation
module.exports.authorProductCheck=authorProductCheck
module.exports.exist=exist

