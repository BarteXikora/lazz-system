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

    const app = await dbConnect.q('SELECT id FROM system_apps WHERE slug = ?;', [apiAppSlug])

    if (!app) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '01'
    })

    if (app.length !== 1) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '02'
    })

    const appID = app[0].id

    const privilage = await dbConnect.q(
        'SELECT COUNT(id) as privilage FROM system_app_access WHERE user_id = ? AND app_id = ?;',
        [userID, appID]
    )

    if (!privilage) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '03'
    })

    if (privilage.length !== 1) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować uprawnień do aplikacji!',
        error: errorCode + '04'
    })

    if (privilage[0].privilage !== 1) return res.json({
        success: false,
        message: 'Nie posiadasz praw dostepu do tej aplikacji!',
        error: errorCode + '05'
    })

    next()
}

module.exports = verifyAppAccess