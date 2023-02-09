const sortByDate = (a, b) => {
    const aDate = new Date(a.date).getTime()
    const bDate = new Date(b.date).getTime()

    return (aDate - bDate) * -1
}

const sortByClient = (a, b) => {
    let aName = a.company ? a.company : a.name ? a.name : 'zzzzzzz'
    let bName = b.company ? b.company : b.name ? b.name : 'zzzzzzz'

    aName.toLowerCase()
    bName.toLowerCase()

    return aName.localeCompare(bName)
}

const sortByDepartment = (a, b) => {
    let aDepartment = a.department !== null ? a.department.name || 'zzzzzzzzzz' : 'zzzzzzzzzz'
    let bDepartment = b.department !== null ? b.department.name || 'zzzzzzzzzz' : 'zzzzzzzzzz'

    aDepartment.toLowerCase()
    bDepartment.toLowerCase()

    return aDepartment.localeCompare(bDepartment)
}

const sortByWorker = (a, b) => {
    let aWorker = a.worker !== null ? a.worker.name || 'zzzzzzzzzz' : 'zzzzzzzzzz'
    let bWorker = b.worker !== null ? b.worker.name || 'zzzzzzzzzz' : 'zzzzzzzzzz'

    aWorker.toLowerCase()
    bWorker.toLowerCase()

    return aWorker.localeCompare(bWorker)
}

const sortByStar = (array) => {
    let newArray = []

    for (const a of array) if (a.star) newArray.push(a)
    for (const a of array) if (!a.star) newArray.push(a)

    return newArray
}

const sortContacts = (list, sort) => {
    if (sort.by === 'date') list = list.sort(sortByDate)
    else if (sort.by === 'client') list = list.sort(sortByClient)
    else if (sort.by === 'department') list = list.sort(sortByDepartment)
    else if (sort.by === 'worker') list = list.sort(sortByWorker)
    else if (sort.by === 'star') list = sortByStar(list)

    if (sort.method === 'desc') list = list.reverse()

    return [...list]
}

export default sortContacts