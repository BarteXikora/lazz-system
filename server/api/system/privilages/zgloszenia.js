const dbConnect = require('../../functions/dbConnect.js')

const getZgloszenia = async (req, res) => {
    const data = await dbConnect.q(`SELECT privilages_list.slug AS privilage FROM 
        privilages_list, privilages WHERE 
        privilages.privilage_id = privilages_list.id AND privilages.user_id = ? AND 
        privilages_list.app_id = 1;`, [req.user]
    )

    if (!data) return res.json({
        success: false,
        messgae: 'Nie udało się pobrać uprawnień.',
        code: '@API/system/privilages/get-zgloszenia#00'
    })

    const privilages = data.map(privilage => privilage.privilage)

    res.json({ success: true, data: privilages })
}

module.exports = { getZgloszenia }