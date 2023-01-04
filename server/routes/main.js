const path = require('path')

// const verifyUser = require('./functions/verifyUserRedirect.js')

// Creates an express router:
const express = require('express')
const router = express.Router()

// Homepage route:
router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// Exports router:
module.exports = router