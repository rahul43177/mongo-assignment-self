const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/totalSales',userController.totalSales)




module.exports = router
