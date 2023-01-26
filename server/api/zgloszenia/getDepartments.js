const dbConnect = require('../functions/dbConnect.js')

const getDepartments = async (req, res) => {
    const data = await dbConnect.q('SELECT * FROM zgloszenia_departments;')

    if (!data) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy działów!',
        error: '@API/zgloszenia/get-departments#00'
    })

    res.json({ success: true, data })
}

module.exports = getDepartments