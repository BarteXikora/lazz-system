const mysql = require('mysql2')

const connect = () => {
    return new Promise(done => {
        const dbConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })

        dbConnection.connect((error) => {
            if (error) done(false)

            done(dbConnection)
        })
    })
}

const checkDB = async () => {
    const ok = await connect()

    if (ok) console.log('[>] Connected to database!')
    else console.log('[!] Database connection error!')

    if (ok) ok.end()
    return ok === true
}

const q = async (query, rows) => {
    return new Promise(async done => {
        const db = await connect()

        if (!db) return done(false)

        db.query(query, rows, (error, result) => {
            db.end()

            if (error) {
                console.error('[!] An error accured on database query!\n[!] ERROR: ', error);
                return done(false)
            }

            return done(result)
        })
    })
}

const cnt = async (query, rows) => {
    const answer = await q(query, rows)

    if (answer === false) return { success: false }

    return { success: true, data: answer.length }
}

module.exports = { connect, checkDB, q, cnt }