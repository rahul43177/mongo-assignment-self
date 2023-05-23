const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : String , 
    lastName : String ,
    mobile : Number , 
    emailId : String , 
    password : String , 
    gender : String ,
    isDeleted : {
        type : Boolean , 
        default : false 
    },
    age : Number , 
    post : {
        type : [] ,
        default : []
    }
},{timestamps: true})

module.exports = mongoose.model('JwtUser',userSchema)
