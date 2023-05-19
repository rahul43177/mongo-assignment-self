const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName : {
        type : String , 
        required : true
    },
    price : {
        indianPrice : String , 
        europePrice : String
    } ,
    year : {
        type : Number , 
        default : 2021 
    },
    tags : [String] ,
    authorName : String , 
    totalPages : Number ,
    stockAvailable : {
        type : Boolean , 
        default : false
    }
})



module.exports = mongoose.model('bookPractice',bookSchema)