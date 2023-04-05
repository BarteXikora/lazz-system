const dbConnect = require('../../functions/dbConnect.js')

const getPrivilages = async (req, res) => {
    const privilages = await dbConnect.q(`SELECT * FROM privilages_list;`)

    if (!privilages) return res.json({
        success: false,
        message: 'Nie udało się pobrać listy uprawnień.',
        code: '@API/system/privilages/get-privilages#00'
    })

    return res.json({ success: true, data: privilages })
}

module.exports = getPrivilages