const jwt = require('jsonwebtoken')
const dbConnect = require('./dbConnect')

const checkForAuthToken = (token) => {
    if (!token) return false

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        return verified.id

    } catch (error) { return false }
}

const checkForIP = async (ip) => {
    const answer = await dbConnect.cnt('SELECT * FROM zgloszenia_config_ips WHERE ip = ?;', [ip])

    if (!answer.success) return false

    return answer.data === 1
}

const verifyByAuthOrIP = async (req, res, next) => {
    const token = req.header('auth-token')

    const verified = checkForAuthToken(token)

    if (verified) {
        req.user = verified

        return next()
    }

    if (await checkForIP(req.ip)) return next()

    res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień.'
    })
}

module.exports = verifyByAuthOrIP