const authorModel = require('../models/authorModel')

let createAuthor = async function(req,res) {
    let data = req.body
    if(!data.author_id) {
        res.send({error : "You need to give the authorID "})
    }
    else { 
        let author = await authorModel.create(data)
        res.send({msg : author})
    }
}



module.exports.createAuthor = createAuthor
