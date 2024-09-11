const express = require('express')

const router = express.Router();

router.use(express.json());

const user = require('./usersRoutes')

router.use(user)

module.exports = router