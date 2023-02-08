import moment from 'moment'

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


    // For dates - from:
    // if (!currentFilters.dates.from_start) {
    //     filtered = []

    //     let fromDate = currentFilters.dates.from_date

    //     $.each(shown, (n, contact) => {
    //         if (moment(contact.date) >= moment(fromDate)) filtered.push(contact)
    //     })

    //     shown = JSON.parse(JSON.stringify(filtered))
    // }

}

const filterContacts = (list, filters) => {
    let currentList = [...list]

    if (filters.form.length > 0) currentList = filterByArray(currentList, 'form', filters.form)
    if (filters.department.length > 0) currentList = filterByArray(currentList, 'department', filters.department)
    currentList = filterByDate(currentList, filters.date)

    return [...currentList]
}

export default filterContacts