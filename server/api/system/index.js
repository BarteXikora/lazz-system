const path = require('path')

const verifyUser = require('../functions/verifyUserAPI.js')

// Creates express router:
const express = require('express')
const router = express.Router()

router.post('/users/register-user', verifyUser, require(path.join(__dirname, 'users', 'registerUser.js')))
router.post('/users/login-user', require(path.join(__dirname, 'users', 'loginUser.js')))
router.post('/users/who-am-i', verifyUser, require(path.join(__dirname, 'users', 'whoAmI.js')))

router.get('/', (req, res) => res.status(200).json({ success: true }))
router.get('*', (req, res) => res.status(404).json({ success: false }))

module.exports = router