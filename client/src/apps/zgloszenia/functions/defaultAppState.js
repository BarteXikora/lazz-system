import clearFilters from './clearFilters'

const defaultAppState = {
    privilages: { add: false, delegate: false, download: false },
    listReady: false,
    formsList: [],
    departmentsList: [],
    workersList: [],
    starsList: [],
    contactsList: [],
    filteredSortedList: [],
    sort: { by: 'date', method: 'asc' },
    currentFilters: clearFilters,
    selectedContact: null,
    error: { isError: false, message: '', code: '' },
    previewShown: false
}

export default defaultAppState