import moment from "moment"

const exportListTXT = (list) => {
    if (list.length === 0) return new Blob('Lista jest pusta', { type: 'text/plain' })

    let string = 'Nr;'

    for (const [key, v] of Object.entries(list[0])) {
        string += key + ';'
    }
    string += '\n'

    let nth = 1
    for (const contact of list) {
        string += nth + ';'
        nth++

        for (const [key, value] of Object.entries(contact)) {
            let current = ''

            if (key === 'date') current = moment(value).format('DD.MM.YYYY HH:mm')
            else if (key === 'department' || key === 'form' || key === 'worker') {
                if (value !== null) current = value.name || ''
            }
            else {
                if (typeof value === 'number') current = value.toString() || ''
                else if (typeof value === 'boolean') current = value ? 'TAK' : 'NIE'
                else current = value || ''
            }

            current = current.toString()
            current = current.replace(/(\r\n|\n|\r)/gm, ' ')
            current = current.replace(';', '')

            string += current + ';'
        }

        string += '\n'
    }

    return new Blob([string], { type: 'text/plain' })
}

const exportListJSON = (list) => {
    return new Blob([JSON.stringify(list)], { type: 'application/json' })
}

export { exportListTXT, exportListJSON }