let authorModel = require('../models/authorModel')

let createAuthor = async function(req,res) {
    let data = req.body
    let create = await authorModel.create(data)
    res.send({author : create})
}

module.exports.createAuthor=createAuthor

