const dbConnect = require('./dbConnect')

const verifyAdmin = async (req, res, next) => {
    const user = req.user

    const errorCode = '@API' + req.originalUrl + '@verify-app-privilages#'

    if (!user) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień administratora systemu.',
        code: errorCode + '00'
    })

    const admin = await dbConnect.cnt('SELECT id FROM system_admins WHERE user_id = ?;', [user])

    if (!admin.success) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień administratora systemu.',
        code: errorCode + '01'
    })

    if (admin.data !== 1) return res.json({
        success: false,
        message: 'Aby wykonać tę operację musisz posiadać uprawnienie administratora systemu.',
        code: errorCode + '02'
    })

    next()
}

module.exports = verifyAdmin