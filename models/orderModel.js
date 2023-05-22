const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({
    userId : {
        type : objectId ,
        ref : "userMiddle"
    },
    productId : {
        type : objectId ,
        ref : 'productMiddle'
    },
    amount : Number ,
    isFreeUser : Boolean ,
    date : String
})


module.exports = mongoose.model('middleOrder', orderSchema)