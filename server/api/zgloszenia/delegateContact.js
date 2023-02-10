const dbConnect = require('../functions/dbConnect.js')

const delegateContact = async (req, res) => {
    const { contactID, workerID } = req.body

    const answer = await dbConnect.q(
        'UPDATE zgloszenia_contacts SET worker = ? WHERE id = ?;',
        [workerID, contactID]
    )

    if (!answer) return res.json({
        success: false,
        message: 'Nie udało się przekazać zgłoszenia!',
        error: '@API/zgloszenia/delegate-contact#00'
    })

    res.json({ success: true })
}

module.exports = delegateContact