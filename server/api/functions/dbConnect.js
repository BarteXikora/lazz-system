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

const checkDB = async (doLog = true) => {
    const ok = await connect()

    if (ok) {
        if (doLog) console.log('[>] Connected to database!')
        return ok
    }
    else {
        if (doLog) console.log('[!] Database connection error!')
        return false
    }
}

const q = async (query, rows) => {
    return new Promise(async done => {
        const db = await checkDB(false)

        if (!db) done(false)

        db.query(query, rows, (error, result) => {
            if (error) {
                console.error('[!] An error accured on database query!', error);
                done(false)
            }

            done(result)
        })
    })
}

const cnt = async (query, rows) => {
    const answer = await q(query, rows)

    if (answer === false) return { success: false }

    return { success: true, data: answer.length }
}

module.exports = { connect, checkDB, q, cnt }