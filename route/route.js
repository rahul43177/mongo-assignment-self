const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')



router.post('/user',userController.user)












module.exports = router
