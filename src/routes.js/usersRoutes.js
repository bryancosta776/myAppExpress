const express = require('express')

const router = express.Router();

router.use(express.json());

const user = require('../controller/routes')

module.exports = user