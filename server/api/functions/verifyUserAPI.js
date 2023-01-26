const jwt = require('jsonwebtoken')

const verifyUserAPI = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) return res.json({
        success: false,
        message: 'Należy być zalogowanym do systemu, by wykonać tę operację.'
    })

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = verified.id
        next()

    } catch (error) {
        return res.json({
            success: false,
            message: 'Nie udało się zweryfikować tokenu. Proszę zalogować się do systemu ' +
                'ponownie, a - jeżeli błąd wystąpi ponownie - skontaktować się z administratorem.'
        })
    }
}

module.exports = verifyUserAPI