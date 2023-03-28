const dbConnect = require('../functions/dbConnect.js')
const verifyAppPrivilages = require('../functions/verifyAppPrivilages.js')

const postContact = async (req, res) => {
    const user = req.user
    const data = req.body

    if (user !== undefined) {
        const privilage = await verifyAppPrivilages(req.user, 'add')

        if (!privilage.success) return res.json({
            success: false,
            message: 'Nie udało się sprawdzić uprawnień!',
            code: '@API/zgloszenia/post-contact/' + privilage.code
        })

        if (!privilage.data) return res.json({
            success: false,
            message: 'Nie posiadasz uprawnień do wykonania tej czynności.',
            code: '@API/zgloszenia/post-contact#00'
        })
    }

    let query = `INSERT INTO zgloszenia_contacts VALUES('', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const answer = await dbConnect.q(query, [
        data.name, data.company, data.nip, data.email, data.tel, data.department, data.form,
        data.topic || '', data.message, data.worker, data.type || '', data.country, data.address,
        data.brand, data.si, data.cycles, data.author
    ])

    if (!answer) return res.json({
        success: false,
        message: 'Nie udało się dodać kontaktu do listy.',
        error: '@API/zgloszenia/post-contact#01'
    })

    res.json({ success: true })
}

module.exports = postContact