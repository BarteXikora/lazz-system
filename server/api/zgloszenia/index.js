const path = require('path')

const verifyUser = require(path.join(__dirname, '..', 'functions', 'verifyUserAPI.js'))
const verifyAppPrivilages = require(path.join(__dirname, '..', 'functions', 'verifyAppPrivilages.js'))

const verifyBoth = [verifyUser, verifyAppPrivilages]

// Creates express router:
const express = require('express')
const router = express.Router()

router.get('/get-list', verifyBoth, require(path.join(__dirname, 'getList.js')))
router.get('/get-forms', verifyBoth, require(path.join(__dirname, 'getForms.js')))
router.get('/get-departments', verifyBoth, require(path.join(__dirname, 'getDepartments.js')))
router.get('/get-workers', verifyBoth, require(path.join(__dirname, 'getWorkers.js')))
router.get('/get-stars', verifyBoth, require(path.join(__dirname, 'getStars.js')))

router.post('/post-stars', verifyBoth, require(path.join(__dirname, 'postStars.js')))
router.post('/delegate-contact', verifyBoth, require(path.join(__dirname, 'delegateContact.js')))


router.get('/', (req, res) => res.status(200).json({ success: true }))
router.get('*', (req, res) => res.status(404).json({ success: false }))

module.exports = router