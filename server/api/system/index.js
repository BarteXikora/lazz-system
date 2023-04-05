const path = require('path')

const verifyUser = require('../functions/verifyUserAPI.js')

// Creates express router:
const express = require('express')
const router = express.Router()

router.post('/users/register-user', verifyUser, require(path.join(__dirname, 'users', 'registerUser.js')))
router.post('/users/login-user', require(path.join(__dirname, 'users', 'loginUser.js')))
router.get('/users/who-am-i', require(path.join(__dirname, 'users', 'whoAmI.js')))
router.post('/users/change-password', verifyUser, require(path.join(__dirname, 'users', 'changePassword.js')))
router.post('/users/change-default-app', verifyUser, require(path.join(__dirname, 'users', 'changeDefaultApp.js')))
router.get('/users/get-users', verifyUser, require(path.join(__dirname, 'users', 'getUsers.js')))

router.get('/privilages/zgloszenia', verifyUser, require(path.join(__dirname, 'privilages', 'zgloszenia.js')).getZgloszenia)

router.get('/', (req, res) => res.status(200).json({ success: true }))
router.get('*', (req, res) => res.status(404).json({ success: false }))

module.exports = router