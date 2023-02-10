const bcrypt = require('bcryptjs')

const dbConnect = require('../../functions/dbConnect.js')

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/

const errorMessage = 'Wystąpił błąd i nie udało się zarejestrować użytkownika. Proszę spróbować ' +
    'ponownie, a - jeżeli problem się powtórzy - skontaktować się z administratorem.'

const registerUser = async (req, res) => {
    // Gets data from request:
    const { name = '', email = '', password = '', password2 = '' } = req.body

    const response = {
        success: false,
        data: { name, email },
        message: `Utworzono konto użytkownika ${name}.`
    }

    // Validates requested data:

    if (!name || !email || !password || !password2) return res.status(400).json({
        ...response,
        message: 'Aby utworzyć użytkownika, należy uzupełnić wszystkie pola.'
    })

    if (name.length < 5 || name.length > 25) return res.status(400).json({
        ...response,
        message: 'Imię i nazwisko muszą mieć łącznie między 5, a 25 znaków.'
    })

    if (!email.match(emailRegex)) return res.status(400).json({
        ...response,
        message: 'Podano nieprawidłowy adres e-mail. Proszę sprawdzić składnię podanego adresu!'
    })

    if (password.length < 8 || password.length > 50) return res.status(400).json({
        ...response,
        message: 'Hasło musi mieć przynajmniej 8, a maksymalnie 50 znaków.'
    })

    if (password !== password2) return res.status(400).json({
        ...response,
        message: 'Podane hasła nie są identyczne. Należy wprowadzić hasła ponownie.'
    })

    if (!password.match(passRegex)) return res.status(400).json({
        ...response,
        message: 'Podane hasło nie spełnia wymogów bezpieczeństwa. ' +
            'Hasło musi składać się z przynajmniej jednej małej litery (a - z),' +
            ' wielkiej litery (A - Z), cyfry (0 - 9), oraz znaku specjalnego jak !, @, itp...'
    })

    // Checks if user with the same email does not exist:
    const usersFound = await dbConnect.cnt(`SELECT id FROM system_users WHERE email=?;`, [email])
    if (!usersFound.success) return res.status(500).json({
        ...response,
        message: errorMessage,
        error: '@API/system/users/register-user#00'
    })

    if (usersFound.data > 0) return res.status(400).json({
        ...response,
        message: 'Użytkownik o podanym adresie e-mail jest już zarejestrowany. Adres e-mail musi ' +
            'być unikatowy.'
    })

    // Hashes password:
    const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))

    // Adds user to database:
    const query = await dbConnect.q(
        `INSERT INTO system_users VALUES('', ?, ?, '1', ?);`,
        [email, name, hashPassword]
    )

    // Respondes:
    if (!query) return res.status(500).json({
        success: false,
        message: errorMessage,
        error: '@API/system/users/register-user#01'
    })

    console.log(`[>] New system user has been registered. Welcome ${name} on board!`)
    return res.status(200).json({ ...response, success: true })
}

module.exports = registerUser