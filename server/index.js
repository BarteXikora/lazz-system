const path = require('path')

// Creates an express server:
const express = require('express')
const server = express()

// Sets public folder:
server.use(express.static(path.join(__dirname, 'views')))

// Adds routes:
server.use('/', require('./routes/main.js'))
server.use('/api', require('./routes/api.js'))

// Loads configuration from a config file:
const config = require('./config/config.js')

// Sets server's port:
const PORT = config.server.PORT || 5000
if (!config.server.PORT)
    console.log('[!] Can not get port from ./config/config.js! Port set to default value of 5000!')

// Runs the server:
server.listen(PORT, () => console.log(`[>] Server is listening on port ${PORT}!`))