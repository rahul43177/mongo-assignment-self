const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')
const bookController = require('../controller/bookController')


//author API
router.post('/createAuthor', authorController.createAuthor )


//book API
router.post('/createBook', bookController.createBook )
router.get('/booksByChetan',bookController.booksByChetan)
router.get('/authorOfTwoStates',bookController.authorOfTwoStates)
router.get('/costbtw50and100',bookController.costbtw50and100)



module.exports = router
