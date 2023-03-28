const dbConnect = require('./dbConnect.js')

const verifyAppPrivilages = async (userID, privilageSlug) => {
    const privilageData =
        await dbConnect.q('SELECT * FROM privilages_list WHERE slug = ?;', [privilageSlug])

    if (!privilageData) return {
        success: false,
        code: '@VERIFY_APP_PRIVILAGES#00'
    }

    if (privilageData.length !== 1) return {
        success: false,
        code: '@VERIFY_APP_PRIVILAGES#01'
    }

    const privilageID = privilageData[0].id

    const hasPrivilage = await dbConnect.q(
        'SELECT COUNT(id) AS privilage FROM privilages WHERE user_id = ? AND privilage_id = ?',
        [userID, privilageID]
    )

    if (!hasPrivilage) return {
        success: false,
        code: '@VERIFY_APP_PRIVILAGES#02'
    }

    if (hasPrivilage[0].privilage !== 1) return {
        success: true,
        data: false
    }

    return { success: true, data: true }
}

module.exports = verifyAppPrivilages