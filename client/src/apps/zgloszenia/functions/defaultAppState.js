import clearFilters from './clearFilters'

const defaultAppState = {
    listReady: false,
    formsList: [],
    departmentsList: [],
    workersList: [],
    starsList: [],
    contactsList: [],
    filteredSortedList: [],
    sort: { by: 'date', method: 'desc' },
    currentFilters: clearFilters,
    selectedContact: null,
    error: { isError: false, message: '', code: '' }
}

export default defaultAppState