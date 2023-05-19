const express = require('express')
const router = express.Router()
const bookController = require('../controller/bookController')


router.post('createBook', bookController.createBook)













module.exports = router 