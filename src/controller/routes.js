const express = require('express')

const router = express.Router();

router.use(express.json());


const logMiddleware = require('../middleware/logMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const createUser = require('../controller/createUserController')
const updateUser = require('../controller/updateUserController')
const deleteUser = require('../controller/deleteUserController')
const readUser = require('../controller/readUserController')

router.post('/user', logMiddleware, createUser )
router.patch('/update/:id', logMiddleware, updateUser)
router.delete('/delete/:id', logMiddleware, deleteUser)
router.get('/read', logMiddleware, readUser)


module.exports = router