const jwt = require('jsonwebtoken')

const dbConnect = require('../../functions/dbConnect.js')

const whoAmI = async (req, res) => {
    const token = req.header('auth-token')

    if (!token) return res.json({
        success: true,
        data: { loggedIn: false }
    })

    let verified
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

    } catch (error) {
        return res.json({
            success: false,
            message: 'Nie udało się zweryfikować tokenu. Proszę zalogować się do systemu ' +
                'ponownie, a - jeżeli błąd wystąpi ponownie - skontaktować się z administratorem.',
            error: '@API/system/users/who-am-i#00'
        })
    }

    const user = await dbConnect.q(`SELECT * FROM system_users WHERE id=?;`, [verified.id])

    let data = {}

    if (!user) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować tokenu. Proszę zalogować się do systemu ' +
            'ponownie, a - jeżeli błąd wystąpi ponownie - skontaktować się z administratorem.',
        error: '@API/system/users/who-am-i#01'
    })

    if (user.length > 0)
        data = { loggedIn: true, id: user[0].id, name: user[0].name, email: user[0].email }

    else return res.json({
        success: true,
        data: { loggedIn: false }
    })

    const admin = await dbConnect.q(`SELECT COUNT(id) AS isAdmin FROM system_admins WHERE user_id=?;`, [verified.id])

    if (!admin) return res.json({
        success: false,
        message: 'Nie udało się zweryfikować tokenu. Proszę zalogować się do systemu ' +
            'ponownie, a - jeżeli błąd wystąpi ponownie - skontaktować się z administratorem.',
        error: '@API/system/users/who-am-i#02'
    })

    if (admin[0].isAdmin > 0) data.admin = true

    const appsList = await dbConnect.q(
        `SELECT * FROM system_apps, system_app_access WHERE system_app_access.user_id = ? 
        AND system_app_access.app_id = system_apps.id ORDER BY system_apps.id`,
        [verified.id]
    )

    data.appsList = appsList.map(app => { return { id: app.app_id, slug: app.slug, name: app.name } })

    res.json({
        success: true,
        data
    })
}

module.exports = whoAmI