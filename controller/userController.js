const userModel = require('../models/userModel')

let createUser = async function(req,res) {
    try{
        let data = req.body
        let create = await userModel.create(data)
        res.status(201).send({status : true , user : create})
    }catch(error){
        console.log(error),res.status(500).send({error: "Internal server error"})
    }
}


module.exports.createUser=createUser