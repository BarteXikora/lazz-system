const dbConnect = require('../../functions/dbConnect.js')

const whoAmI = async (req, res) => {
    const id = req.user

    const user = await dbConnect.q(`SELECT * FROM system_users WHERE id=?;`, [id])

    if (user) return res.status(200).json({
        success: true,
        data: { id, name: user[0].name, email: user[0].email }
    })

    return res.status(400).json({
        succes: false,
        message: 'Wystąpił błąd i nie udało się pobrać danych użytkownika. ' +
            'Skontaktuj się z administratorem.',
        error: '@API/system/users/who-am-i#00'
    })
}

module.exports = whoAmI