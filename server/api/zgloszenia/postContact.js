const dbConnect = require('../functions/dbConnect.js')

const postContact = async (req, res) => {
    const data = req.body

    let query = `INSERT INTO zgloszenia_contacts VALUES('', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const answer = await dbConnect.q(query, [
        data.name, data.company, data.nip, data.email, data.tel, data.department, data.form,
        data.topic || '', data.message, data.worker, data.type || '', data.country, data.address,
        data.brand, data.si, data.cycles, data.author
    ])

    if (!answer) return res.json({
        success: false,
        message: 'Nie udało się dodać kontaktu do listy.',
        error: '@API/zgloszenia/post-contact#00'
    })

    res.json({ success: true })
}

module.exports = postContact