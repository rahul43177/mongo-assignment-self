const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')

let createBook = async function(req,res) {
    let data = req.body 
    if(!data.author_id) {
        res.send({error : "You need to enter the author id"})
    }
    else {
        let book = await bookModel.create(data)
        res.send({data : book})
    }
}
let booksByChetan = async function(req,res) {
    let data = await authorModel.findOne({author_name : "Chetan Bhagat"})
    let booksByChetan = await bookModel.find({author_id : data.author_id}).select({name : 1 , _id : 0})
    res.send({msg : booksByChetan})
}

let authorOfTwoStates = async function(req,res) {
    let book = await bookModel.findOneAndUpdate(
        {name : "Two states"} ,
        {price : 100} ,
        {new : true}
    )
    let author = await authorModel.findOne({author_id : book.author_id}).select({author_name : 1 , _id:0})
    res.send({msg : author , price : book.price })
}

let costbtw50and100 = async function(req,res) {
    let authorId = await bookModel.find(
        {price : {$gte : 50 , $lte : 100}} 
    ).select({author_id : 1 , _id : 0})
    let array = []
    let newArr = authorId.map((el)=>el.author_id)
    for(let i =0;i<newArr.length;i++) {
        let id = newArr[i]
        let author = await authorModel.findOne({author_id : id }).select({author_name : 1 , _id:0})
        array.push(author)
    }
    res.send({msg : array})
}
    



module.exports.createBook=createBook
module.exports.booksByChetan=booksByChetan
module.exports.authorOfTwoStates=authorOfTwoStates
module.exports.costbtw50and100=costbtw50and100
