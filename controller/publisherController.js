let publisherModel = require('../models/publisherModel')

let createPublisher = async function(req,res) {
    let data = req.body
    let create = await publisherModel.create(data)
    res.send({publisher : create})
}


module.exports.createPublisher=createPublisher