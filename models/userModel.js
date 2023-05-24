const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name : String ,
    price : Number , 
    sales : Number 
})


module.exports = mongoose.model("agg",userSchema)
