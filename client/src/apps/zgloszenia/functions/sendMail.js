import moment from 'moment'

const translateKey = (key) => {
    const dictionary = {
        date: 'Czas przyjęcia zgłoszenia',
        name: 'Imię i Nazwisko, Nazwa',
        company: 'Nazwa firmy',
        nip: 'NIP / VAT EU',
        email: 'Adres e-mail',
        tel: 'Numer telefonu',
        topic: 'Temat',
        message: 'Treść wiadomości',
        type: 'Typ zgłoszenia',
        country: 'Kraj zgłoszenia',
        address: 'Adres',
        brand: 'Marka i model',
        si: 'Numer seryjny',
        cycles: 'Liczba wykonanych cykli',
        form: 'Formularz',
        department: 'Dział',
    }

    return dictionary[key] || '[niestandardowa dana]'
}

const sendMail = (contact, to = '') => {
    let title = 'Przypomnienie - zgłoszenie z formularza na stronie Lazzoni Group'

    let filledData = {}, notFilledData = []

    for (const [key, value] of Object.entries(contact)) {
        if (typeof value === 'string') {
            if (value !== '') filledData = { ...filledData, [key]: value }

        } else if (value !== null) {
            if (key === 'form' || key === 'department') filledData = { ...filledData, [key]: value }
        }
    }

    for (const [key, value] of Object.entries(contact)) {
        if ((key !== 'worker' && key !== 'author') && (value === '' || value === null))
            notFilledData.push(key)
    }

    let body = 'Podane informacje:\n\n'

    if (Object.entries(filledData).length === 0) body += '[brak uzupełnionych danych]\n'
    else {
        for (const [key, value] of Object.entries(filledData)) {
            if (typeof value === 'string') {
                if (value !== '') {
                    if (key === 'date')
                        body += translateKey(key) + ': ' + moment(value).format('DD.MM.YYYY, HH:mm') + ',\n'

                    else body += translateKey(key) + ': ' + value + ',\n'
                }

            } else if (value !== null) {
                let valueToShow = ''
                if (key === 'form' || key === 'department') valueToShow = value.name

                if (valueToShow !== '') body += translateKey(key) + ': ' + valueToShow + ',\n'
            }
        }

        body = body.slice(0, -2) + '.\n'
    }

    if (notFilledData.length !== 0) {
        body += '\nNieuzupełnione dane:\n\n'

        for (const field of notFilledData) {
            body += translateKey(field) + ', '
        }

        body = body.slice(0, -2) + '.'
    }

    document.location = 'mailto:' + to + '?subject=' + title + '&body=' + encodeURIComponent(body)
}

export default sendMail