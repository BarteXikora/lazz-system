const dbConnect = require('../functions/dbConnect.js')

const postStars = async (req, res) => {
    const starsToAdd = Object.entries(req.body).filter(s => s[1]).map(s => s[0])
    const starsToRem = Object.entries(req.body).filter(s => !s[1]).map(s => s[0])

    let addQuery = '', remQuery = ''

    if (starsToAdd.length > 0) {
        addQuery = 'INSERT INTO zgloszenia_stars VALUES '

        starsToAdd.forEach(s => {
            addQuery += `('', '${req.user}', '${s}'),`
        })

        addQuery = addQuery.slice(0, -1) + '; '
    }

    if (starsToRem.length > 0) {
        remQuery = `DELETE FROM zgloszenia_stars WHERE user_id = '${req.user}' AND (`

        starsToRem.forEach((s, n) => {
            remQuery += `${n > 0 ? 'OR' : ''} contact_id = '${s}' `
        })

        remQuery += ');'
    }

    let addAnswer = true, remAnswer = true

    if (addQuery !== '') addAnswer = await dbConnect.q(addQuery)
    if (remQuery !== '') remAnswer = await dbConnect.q(remQuery)

    let message = '', error = ''
    if (!addAnswer && !remAnswer) {
        message = 'Nie udało się zapisać zmian związanych z oznaczeniem kontaktów gwiazdkami.'
        error = '@API/zgloszenia/post-stars#00'

    } else if (!addAnswer || !remAnswer) {
        message = 'Nie udało się zapisać wszystkich zmian związanych z oznaczeniem kontaktów gwiazdkami.'

        if (!addAnswer) error = '@API/zgloszenia/post-stars#01'
        else error = '@API/zgloszenia/post-stars#02'
    }

    res.json({ success: (addAnswer && remAnswer) ? true : false, message, error })
}

module.exports = postStars