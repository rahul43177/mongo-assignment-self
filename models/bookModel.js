const mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    name : String , 
    author : {
        type : objectId,
        ref : "refPopAuthor"
    },
    price : Number , 
    rating : Number , 
    publisher : {
        type : objectId , 
        ref : "refPopPublisher"
    },
    isHardCover : {
        type : Boolean ,
        default : false
    }
})
//write an API to create book Entry 


module.exports = mongoose.model("refPopBook", bookSchema)