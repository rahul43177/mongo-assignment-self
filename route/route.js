const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const middleware = require('../middleware/auth')


router.post('/createUser',userController.createUser)
router.post('/login',userController.login)
router.get('/users/:userId',middleware.tokenCheck,userController.userFetch)
router.put('/users:userId', middleware.tokenCheck , userController.updateDetails)
router.delete('/users/:userId',userController.deleteItem)
router.put('/postMessage',middleware.tokenCheck , userController.postMessage)











module.exports = router
