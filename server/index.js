const path = require('path')

// Configurates .env:
const dotenv = require('dotenv')
dotenv.config()

// Checks for database connection:
const dbConnection = require('./api/functions/dbConnect')
dbConnection.checkDB()

// Creates an express server:
const express = require('express')
const server = express()

// Sets cors:
const cors = require('cors');
server.use(cors());

// Sets public folder:
server.use(express.static(path.join(__dirname, 'public')))

// Sets body parser:
const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// Adds routes:
server.use('/api', require('./routes/api.js'))
server.use('/', require('./routes/main.js'))

// Sets server's port:
const PORT = process.env.SYS_PORT || 5000
if (!process.env.SYS_PORT)
    console.log('[!] Can not get port from .env file! Port set to default value of 5000!')

// Runs the server:
server.listen(PORT, () => console.log(`[>] Server is listening on port ${PORT}!`))