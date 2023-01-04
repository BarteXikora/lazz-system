const jwt = require('jsonwebtoken')

const dbConnect = require('../../api/functions/dbConnect.js')

const verifyUserRedirect = async (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        req.user = { success: false, type: 'token not found' }
        next()
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

        const usersFound = await dbConnect.cnt(`SELECT id FROM system_users WHERE id=?;`, [verified.id])
        if (usersFound.data === 1) {
            req.user = { success: true, user: verified.id }

        } else {
            req.user = { success: false, type: 'user id not found in database' }
        }

        next()

    } catch (error) {
        req.user = { success: false, type: 'token verification error' }
        next()
    }
}

module.exports = verifyUserRedirect