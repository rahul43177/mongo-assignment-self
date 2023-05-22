const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productSchema')


let createOrder = async function(req,res) {
   try {
    let header = req.headers['isfreeappuser']
    let userId = req.body.userId
    let productId = req.body.productId
    let user = await userModel.findById(userId)
    let product = await productModel.findById(productId)

    let more = user.balance - product.price 
    
    if(header == 'false') {
        if(more > 0) {  //sufficient balance
            let userBalance = await userModel.findByIdAndUpdate(
                userId , 
                {$set : {balance : more}} ,
                {new : true}
            )
            req.body.amount = product.price
            let orderInfo = req.body
            let createOrder = await orderModel.create(orderInfo)
            res.status(401).send({order : createOrder})
        }
        else if(more < 0) {
            res.status(404).send({error : "Insufficient balance"})
        }
    }
    else {
        req.body.amount = 0
        let info = req.body
        let createOrder = await orderModel.create(info)
        res.status(401).send({status : true , order : createOrder})
    }
    

   }catch(error) {
    console.log(error)
    res.status(500).send({error : "Internal server error"})
   }

    
    

}

module.exports.createOrder=createOrder


