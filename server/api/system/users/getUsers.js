const dbConnect = require('../../functions/dbConnect.js')

const getUsers = async (req, res) => {
    const users = await dbConnect.q('SELECT id, email, name FROM system_users ORDER BY name;')

    if (!users) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy użytkowników.',
        code: '@API/system/users/get-users#00'
    })

    return res.json({ success: true, data: users })
}

module.exports = getUsers