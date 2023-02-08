import moment from 'moment'

const doSearch = (list, search) => {
    let newArray = []

    list.forEach((contact) => {
        for (const [key, value] of Object.entries(contact)) {
            if (typeof value === 'string') {
                if (value.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    newArray.push(contact)
                    return
                }
            }
        }
    })

    return newArray
}

const filterByArray = (list, field, filters) => {
    let newArray = []

    list.forEach((contact) => {
        let any = true

        if (contact[field] === null) return

        filters.forEach((filter) => {
            if (contact[field].id === filter.id) any = false
        })

        if (any) newArray.push(contact)
    })

    return newArray
}

const filterByDate = (list, filters) => {
    if (!filters.fromStart) {
        let filtered = []
        let fromDate = filters.from

        list.forEach((contact) => {
            if (moment(contact.date).isSameOrAfter(fromDate, 'day')) filtered.push(contact)
        })

        list = [...filtered]
    }

    if (!filters.toEnd) {
        let filtered = []
        let toDate = filters.to

        list.forEach((contact) => {
            if (moment(contact.date).isSameOrBefore(toDate, 'day')) filtered.push(contact)
        })

        list = [...filtered]
    }

    return list
}

const filterContacts = (list, filters) => {
    let currentList = [...list]

    if (filters.search !== '') currentList = doSearch(currentList, filters.search)
    if (filters.form.length > 0) currentList = filterByArray(currentList, 'form', filters.form)
    if (filters.department.length > 0) currentList = filterByArray(currentList, 'department', filters.department)
    currentList = filterByDate(currentList, filters.date)

    return [...currentList]
}

export default filterContacts