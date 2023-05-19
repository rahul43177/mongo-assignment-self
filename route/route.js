const express = require('express')
const router = express.Router()
const bookController = require('../controller/bookController')


router.post('/createBook', bookController.createBook)
router.get('/getBookData', bookController.getBooks)
router.post('/getBooksInYear', bookController.getBooksInYear)
router.post('/getParticularBooks',bookController.getParticularBooks)
router.get('/getXINRBooks',bookController.getXINRBooks)
router.get('/getRandomBooks',bookController.getRandomBooks)







module.exports = router 