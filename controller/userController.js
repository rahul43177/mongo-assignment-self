const userModel = require('../models/userModel')

let user = async function(req,res) {
    try { 
        let details = req.body
        let create = await userModel.create(details)
        res.status(401).send({status : true , user : create})
    } catch(error) {
        console.log(error)
        res.status(500).send({error : "Internal server error"})
    }
}

let login = async function(req,res) {
    let email = req.body.email
    let password = req.body.password
    if(!email || !password ) {
        res.status(404).send({status : false , error : "Email or password are not there"})
    }
    let user = await userModel.findOne({emailId : email , password : password})
    if(!user) {
        res.status(404).send({status : false , error : "User with this email or password is not found"})
    }
    const token = jwt.sign({
        
    })
}

module.exports.user=user