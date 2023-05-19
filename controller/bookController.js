
const bookModel = require('../models/bookModel')

let createBook = async function(req,res) {
    let data = req.body.data 
    let createBook = await bookModel.create(data)
    res.send({msg : createBook})
}




module.exports.createBook=createBook