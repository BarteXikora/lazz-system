const dbConnect = require('../../functions/dbConnect.js')
const bcrypt = require('bcryptjs')

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/

const changePassword = async (req, res) => {
    const { newPassword, currentPassword } = req.body

    if (!newPassword || !currentPassword) return res.json({
        success: false,
        message: 'Nie udało się zmienić hasła.',
        code: '@API/system/users/change-password#00'
    })

    let response = await dbConnect.q(
        'SELECT password FROM system_users WHERE id = ?;',
        [req.user]
    )

    if (response.length !== 1) return res.json({
        success: false,
        message: 'Nie udało się zmienić hasła.',
        code: '@API/system/users/change-password#01'
    })

    const validPassword = await bcrypt.compare(currentPassword, response[0].password)

    if (!validPassword) return res.json({
        success: false,
        message: 'Wprowadzono nieprawidłowe aktualne hasło. Proszę poprawić hasło i spróbować ponownie.',
        code: '@API/system/users/change-password#02'
    })

    if (newPassword.length < 8 || newPassword.length > 50) return res.json({
        success: false,
        message: 'Nowe hasło musi mieć przynajmniej 8, a maksymalnie 50 znaków.',
        code: '@API/system/users/change-password#03'
    })

    if (!newPassword.match(passRegex)) return res.json({
        success: false,
        message: 'Podane hasło nie spełnia wymogów bezpieczeństwa. ' +
            'Hasło musi składać się z przynajmniej jednej małej litery (a - z),' +
            ' wielkiej litery (A - Z), cyfry (0 - 9), oraz znaku specjalnego jak !, @, itp...',
        code: '@API/system/users/change-password#04'
    })

    const hashPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(10))

    response = dbConnect.q(
        'UPDATE system_users SET password = ? WHERE id = ?;',
        [hashPassword, req.user]
    )

    if (!response) return res.json({
        success: false,
        message: 'Nie udało się zmienić hasła.',
        code: '@API/system/users/change-password#05'
    })

    res.json({ success: true })
}

module.exports = changePassword