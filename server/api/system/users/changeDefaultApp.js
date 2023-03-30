const dbConnect = require('../../functions/dbConnect.js')

const changeDefaultApp = async (req, res) => {
    const user = req.user
    const { defaultAppID } = req.body

    const response = await dbConnect.cnt(
        'SELECT * FROM system_users_def_app WHERE user_id = ?;',
        [user]
    )

    if (!response.success) return res.json({
        success: false,
        message: 'Nie udało się zmienić aplikacji domyślenj.',
        code: '@API/system/users/change-default-app#00'
    })

    if (response.data === 0) {
        const addRow = await dbConnect.q(`INSERT INTO system_users_def_app VALUES('', ?, -1);`, [user])

        if (!addRow) return res.json({
            success: false,
            message: 'Nie udało się zmienić aplikacji domyślenj.',
            code: '@API/system/users/change-default-app#01'
        })
    }

    const changeApp = await dbConnect.q(
        'UPDATE system_users_def_app SET app_id = ? WHERE user_id = ?;',
        [defaultAppID, user]
    )

    if (defaultAppID === undefined || defaultAppID === null) return res.json({
        success: false,
        message: 'Nie udało się zmienić aplikacji domyślenj.',
        code: '@API/system/users/change-default-app#02'
    })

    if (!changeApp) return res.json({
        success: false,
        message: 'Nie udało się zmienić aplikacji domyślenj.',
        code: '@API/system/users/change-default-app#03'
    })

    return res.json({ success: true })
}

module.exports = changeDefaultApp