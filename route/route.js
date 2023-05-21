const express = require('express')
const router = express.Router()
let authorController = require('../controller/authorController')
let publisherController = require('../controller/publisherController')
let bookController = require('../controller/bookController')
router.post('/createAuthor',authorController.createAuthor)
router.post('/createPublisher',publisherController.createPublisher)
router.post('/createBook',bookController.createBook)
router.get('/booksWithAuthorAndPublisher',bookController.booksWithAuthorAndPublisher)
router.put('/isHardCover',bookController.isHardCover)
module.exports = router
router.put('/authorWithRating',bookController.authorWithRating)