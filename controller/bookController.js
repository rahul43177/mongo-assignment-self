
const bookModel = require('../models/bookModel')

let createBook = async function(req,res) {
    let data = req.body 
    let createBook = await bookModel.create(data)
    res.send({msg : createBook})
}
let getBooks = async function(req,res) {
    let bookData = await bookModel.find().select({bookName : 1 , authorName:1 ,_id:0})
    res.send({msg : bookData})
}

let getBooksInYear = async function(req,res) {
    let year = req.body.year
    let book = await bookModel.find({year : year }).select({_id : 0})
    res.send({msg : book })
}
let getParticularBooks = async function(req,res) {
    let data = req.body
    let particular = await bookModel.find(data).select({_id:0})
    res.send({msg : particular})
}

let getXINRBooks = async function(req,res) {
    let data = await bookModel.find({
        $or : [{"price.indianPrice" : "100INR"}, {"price.indianPrice" : "200INR"} , {"price.indianPrice" : "500INR"}]
    }).select({bookName : 1 , authorName : 1 , _id : 0 , price : 1})
    res.send({msg : data})  
}
let getRandomBooks = async function(req,res) {
    let available = await bookModel.find({
        $or : [{stockAvailable : true} , {totalPages : {$gt : 500}}]
    })
    res.send({msg : available})

    
}



module.exports.createBook=createBook
module.exports.getBooks=getBooks
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks
