const dbConnect = require('../functions/dbConnect.js')

const getList = async (req, res) => {
    const data = await dbConnect.q('SELECT * FROM zgloszenia_contacts ORDER BY date DESC')

    if (!data) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy zgłoszeń',
        error: '@API/zgloszenia/get-list#00'
    })

    res.json({ success: true, data })
}

module.exports = getList