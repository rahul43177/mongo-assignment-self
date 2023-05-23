const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

let createUser = async function(req,res) {
    try {
        let userDetails = req.body
        let create = await userModel.create(userDetails)
        res.status(201).send({user : create})
    }catch(error) {
        console.log(error)
        res.status(500).send({error : "Internal server error"})
    }
}
let login = async function(req,res) {
    try {
        let email = req.body.emailId
        let password = req.body.password 
        if(!email || !password )  return res.status(404).send({error : "You need to enter email or password"})

        let user = await userModel.findOne({emailId : email , password : password})
        if(!user)  return res.status(404).send({error : "User not found , email or password is wrong"})

        const token = jwt.sign(
            {
                userId : user._id.toString() ,
                email :  user.emailId
            },
            "secret-key"
        )
        res.setHeader('x-auth-token',token)
        res.send({status : true , token : token})
    }catch(error) {
        console.log(error)
        res.status(500).send({error : "Internal server error"})
    }
}


let userFetch = async function(req,res) {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if(!user)  return res.send({status : false , error : "No such user exists"})
    res.send({status: true , user : user})
}

let updateDetails = async function(req,res) {
    let userId = req.params.userId
    let update = await userModel.findByIdAndUpdate(
        userId ,
        {$set : req.body} ,
        {new : true}
    )
    res.send({status : true , update : update})
}
let deleteItem = async function(req,res) {
    let userId = req.params.userId 
    let update = await userModel.findByIdAndUpdate(
        userId , 
        {$set : {isDeleted : true}} ,
        {new : true}
    )
    res.send({status : true  , deleted : update})
}





module.exports.createUser = createUser
module.exports.login = login
module.exports.userFetch = userFetch
module.exports.updateDetails = updateDetails
module.exports.deleteItem = deleteItem
