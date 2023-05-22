const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const middleware = require('../middleware/auth')
const orderController = require('../controller/orderController')




router.post('/createProduct',productController.createProduct)
router.post('/createUser', middleware.headervalidation , userController.createUser)
router.post('/createOrder', middleware.headervalidation , middleware.authorProductCheck , middleware.exist , orderController.createOrder)





module.exports = router