const dbConnect = require('../functions/dbConnect.js')

const getStars = async (req, res) => {
    const data = await dbConnect.q(
        'SELECT contact_id FROM zgloszenia_stars WHERE user_id = ?;',
        [req.user]
    )

    if (!data) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy gwiazdek!',
        error: '@API/zgloszenia/get-stars#00'
    })

    res.json({ success: true, data })
}

module.exports = getStars