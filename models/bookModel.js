let mongoose = require('mongoose') 

let bookSchema = new mongoose.Schema({
    bookName : String , 
    authorName : String , 
    category : String ,
    year : Number
})


module.exports = mongoose.model('practiceBook',bookSchema)