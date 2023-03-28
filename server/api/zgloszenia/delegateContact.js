const dbConnect = require('../functions/dbConnect.js')
const verifyAppPrivilages = require('../functions/verifyAppPrivilages.js')

const delegateContact = async (req, res) => {
    const user = req.user
    const { contactID, workerID } = req.body

    const privilage = await verifyAppPrivilages(req.user, 'delegate')

    if (!privilage) return res.json({
        success: false,
        message: 'Nie udało się sprawdzić uprawnień!',
        code: '@API/zgloszenia/delegate-contact/' + privilage.code
    })

    if (!privilage.data) return res.json({
        success: false,
        message: 'Nie posiadasz uprawnień do wykonania tej czynności.',
        code: '@API/zgloszenia/delegate-contact#00'
    })

    const answer = await dbConnect.q(
        'UPDATE zgloszenia_contacts SET worker = ? WHERE id = ?;',
        [workerID, contactID]
    )

    if (!answer) return res.json({
        success: false,
        message: 'Nie udało się przekazać zgłoszenia!',
        error: '@API/zgloszenia/delegate-contact#01'
    })

    res.json({ success: true })
}

module.exports = delegateContact