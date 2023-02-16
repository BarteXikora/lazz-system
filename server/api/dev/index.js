const path = require('path')

const verifyUser = require('../functions/verifyUserAPI.js')

// Creates express router:
const express = require('express')
const router = express.Router()

router.get('/get-ip', require(path.join(__dirname, 'getIP.js')))

router.get('/', (req, res) => res.status(200).json({ success: true }))
router.get('*', (req, res) => res.status(404).json({ success: false }))

module.exports = router