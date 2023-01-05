const jwt = require('jsonwebtoken')

const dbConnect = require('../../functions/dbConnect.js')

const whoAmI = async (req, res) => {
    const token = req.header('auth-token')

    if (!token) return res.status(200).json({
        success: true,
        data: { loggedIn: false }
    })

    let verified
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Nie udało się zweryfikować tokenu. Proszę zalogować się do systemu ' +
                'ponownie, a - jeżeli błąd wystąpi ponownie - skontaktować się z administratorem.',
            error: '@API/system/users/who-am-i#00'
        })
    }

    const user = await dbConnect.q(`SELECT * FROM system_users WHERE id=?;`, [verified.id])

    if (user) if (user.length > 0) return res.status(200).json({
        success: true,
        data: { loggedIn: true, id: user[0].id, name: user[0].name, email: user[0].email }
    })

    return res.status(400).json({
        succes: false,
        message: 'Wystąpił błąd i nie udało się pobrać danych użytkownika. ' +
            'Skontaktuj się z administratorem.',
        error: '@API/system/users/who-am-i#01'
    })
}

module.exports = whoAmI



// OLD:


// const whoAmI = async (req, res) => {
//     const id = req.user

//     const user = await dbConnect.q(`SELECT * FROM system_users WHERE id=?;`, [id])

//     if (user) if (user.length > 0) return res.status(200).json({
//         success: true,
//         data: { id, name: user[0].name, email: user[0].email }
//     })

//     return res.status(400).json({
//         succes: false,
//         message: 'Wystąpił błąd i nie udało się pobrać danych użytkownika. ' +
//             'Skontaktuj się z administratorem.',
//         error: '@API/system/users/who-am-i#00'
//     })
// }