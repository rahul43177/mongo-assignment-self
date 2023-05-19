const express = require('express') 
const router = express()
const bookController = require('../controller/bookController')

router.post('/createBook',bookController.createBook)

router.get('/getBooks',bookController.getAllBooks)

module.exports = router