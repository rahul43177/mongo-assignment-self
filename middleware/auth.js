const jwt = require('jsonwebtoken')

let tokenCheck = async function(req,res,next) {
    try {
        let token = req.headers['x-auth-token']
        if(!token) return res.send({status : false , error : "access token is not present"})

        let decodedToken = jwt.verify(token , 'secret-key')
        if(!decodedToken) return res.send({status : false , error : "The token is not matching"})

        next()
    }catch(error) {
        console.log(error)
        res.send({status : false , error : `Token is not valid`})
    }
}

module.exports.tokenCheck=tokenCheck