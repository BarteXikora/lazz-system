const dbConnect = require('../../functions/dbConnect.js')

const getUsersAppsAccesses = async (req, res) => {
    const appsAccesses = await dbConnect.q(`SELECT * FROM system_app_access;`)

    if (!appsAccesses) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy dostepów do aplikacji użytkowników.',
        code: '@API/system/users/get-users-apps-accesses#00'
    })

    return res.json({ success: true, data: appsAccesses })
}

module.exports = getUsersAppsAccesses