const dbConnect = require('../../functions/dbConnect.js')

const getAdmins = async (req, res) => {
    const admins = await dbConnect.q(
        `SELECT system_users.id, system_users.name, system_users.email FROM system_users, system_admins 
        WHERE system_users.id = system_admins.user_id;`
    )

    if (!admins) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy administratorów systemu.',
        code: '@API/system/users/get-admins#00'
    })

    return res.json({ success: true, data: admins })
}

module.exports = getAdmins