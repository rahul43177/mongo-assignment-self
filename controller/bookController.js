let bookModel = require('../models/bookModel')

let createBook = async function (req,res){
    let data = req.body
    let create = await bookModel.create(data)
    res.send({msg : create})
}

let getAllBooks = async function(req,res){ 
    let getBooks = await bookModel.find()
    res.send({msg : getBooks})
}


module.exports.createBook=createBook
module.exports.getAllBooks=getAllBooks