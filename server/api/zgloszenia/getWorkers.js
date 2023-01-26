const dbConnect = require('../functions/dbConnect.js')

const getWorkers = async (req, res) => {
    const data = await dbConnect.q('SELECT id, email, name FROM system_users WHERE public = true;')

    if (!data) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy pracowników!',
        error: '@API/zgloszenia/get-workers#00'
    })

    res.json({ success: true, data })
}

module.exports = getWorkers