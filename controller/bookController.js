const bookModel = require('../models/bookModel')
const mongoose = require('mongoose')

//3rd 
let createBook = async function(req,res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher
    if(!authorId || !publisherId) {
        if(!auhtorId) {
            res.send({error : "YOu need to enter Author ID "})
        }
        else { 
            res.send({error : "you need to enter Publisher ID"})
        }
    }
    if(publisherId) {
        if(!mongoose.Types.ObjectId.isValid(publisherId)){
            res.send({error : "You have entered an invalid publisher Id"})
        } 
    }
    if(authorId) {
        if(!mongoose.Types.ObjectId.isValid(authorId)) {
            res.send({error : "You have entered an invalid authorID "})
        }
    }
    let create = await bookModel.create(book)  
    res.send({book : create})
}
//4th 
let booksWithAuthorAndPublisher = async function(req,res) {
    let data = await bookModel.find().populate("author").populate("publisher")  //populate me double quotes
    res.send({data : data})
}

let isHardCover = async function(req,res) {
    let book = await bookModel.find().populate("publisher")
    let publisher = book.filter((el)=>el.publisher.name == "HarperCollins" || el.publisher.name == "Penguin")
    let arr = []
    for(let i = 0;i<publisher.length;i++) {
        let id = publisher[i]._id
        let update = await bookModel.findByIdAndUpdate(
            id,
            {$set:{isHardCover : true}} ,
            {new : true}
        ).populate("publisher")
        arr.push(update)
    }
    return res.send({data : arr})
}

let authorWithRating = async function(req,res) {
    let data = await bookModel.find().populate("author")
    let allAuthors = data.filter((el)=>el.author)
    let authors = allAuthors.filter((el)=>el.author.rating > 3.5)
    let array = []
    for(let i = 0;i < authors.length;i++) {
        let id = authors[i]._id
        let prize = (authors[i].price)+ 10
        let update = await bookModel.findByIdAndUpdate(
            id , 
            {$set : {price : prize}},
            {new : true}
        ).populate("author")
        array.push(update)
    }
    res.send({data : array})
}


module.exports.createBook=createBook
module.exports.booksWithAuthorAndPublisher=booksWithAuthorAndPublisher
module.exports.isHardCover=isHardCover
module.exports.authorWithRating=authorWithRating
