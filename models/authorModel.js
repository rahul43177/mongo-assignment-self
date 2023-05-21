const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    authorName : String, // name
    age : Number ,
    address : String,
    rating : Number
})


module.exports = mongoose.model('refPopAuthor',authorSchema)