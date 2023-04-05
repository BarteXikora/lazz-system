const dbConnect = require('../functions/dbConnect.js')

const verifyAppAccess = async (req, res, next) => {
    const apiAppSlug = req.baseUrl.replace('/api/', '')
    const userID = req.user

    const errorCode = '@API' + req.originalUrl + '@verify-app-privilages#'

    if (!apiAppSlug || !userID) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '00'
    })

    const admin = await dbConnect.cnt(`SELECT id FROM system_admins WHERE user_id = ?;`, [userID])

    if (!admin) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '01'
    })

    const isAdmin = admin.data === 1

    if (isAdmin) return next()

    const app = await dbConnect.q('SELECT id FROM system_apps WHERE slug = ?;', [apiAppSlug])

    if (!app) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '02'
    })

    if (app.length !== 1) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '03'
    })

    const appID = app[0].id

    const privilage = await dbConnect.q(
        'SELECT COUNT(id) as privilage FROM system_app_access WHERE user_id = ? AND app_id = ?;',
        [userID, appID]
    )

    if (!privilage) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '04'
    })

    if (privilage.length !== 1) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '05'
    })

    if (privilage[0].privilage !== 1) return res.json({
        success: false,
        message: 'Nie posiadasz praw dostepu do tej aplikacji!',
        error: errorCode + '06'
    })

    next()
}

module.exports = verifyAppAccess