const path = require('path')

const express = require('express')
const router = express.Router()

router.use('/system', require(path.join(__dirname, '..', 'api', 'system', 'index.js')))
router.use('/zgloszenia', require(path.join(__dirname, '..', 'api', 'zgloszenia', 'index.js')))

module.exports = router