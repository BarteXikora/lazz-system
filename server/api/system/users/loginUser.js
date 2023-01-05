const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dbConnect = require('../../functions/dbConnect.js')

const errorMessage = 'Wystąpił błąd i nie udało się zalogować. Proszę spróbować ' +
    'ponownie, a - jeżeli problem się powtórzy - skontaktować się z administratorem.'
const wrongData = 'Wprowadzono nieprawidłowy adres e-mail, lub hasło. Proszę sprawdzić ' +
    'dane i spróbować ponownie.'

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const response = { success: false }

    if (!email || !password) return res.json({
        ...response,
        message: 'Proszę podać adres e-mail i hasło.'
    })


    const userFound = await dbConnect.q(`SELECT * FROM system_users WHERE email=?;`, [email])

    if (!userFound) return res.json({
        ...response,
        message: errorMessage,
        error: '@API/system/user/login-user#00'
    })

    if (userFound.length !== 1) return res.json({
        ...response,
        message: wrongData
    })

    const validPassword = await bcrypt.compare(password, userFound[0].password)

    if (!validPassword) {
        return res.json({
            ...response,
            message: wrongData
        })
    }

    // Creates and assigns a token:
    const token = jwt.sign({ id: userFound[0].id }, process.env.JWT_SECRET_TOKEN)

    console.log(`[>] ${userFound[0].name} just logged in.`)
    return res.json({
        success: true,
        message: '',
        data: { id: userFound[0].id, email: userFound[0].email, name: userFound[0].name, authToken: token }
    })
}

module.exports = loginUser