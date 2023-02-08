import filterContacts from './filterContacts'

const appReducer = (state, action) => {
    if (action.type === 'LOAD_FORMS') {
        return { ...state, formsList: action.payload }
    }

    if (action.type === 'LOAD_DEPARTMENTS') {
        return { ...state, departmentsList: action.payload }
    }

    if (action.type === 'LOAD_WORKERS') {
        return { ...state, workersList: action.payload }
    }

    if (action.type === 'LOAD_STARS') {
        return { ...state, starsList: action.payload }
    }

    if (action.type === 'LOAD_CONTACTS') {
        let selected = null
        if (action.payload) if (action.payload.length > 0) selected = action.payload[0].id

        if (action.payload) for (const contact of action.payload) {
            // Fill form data:
            let foundForm = state.formsList.filter(form => form.id === contact.form)
            if (foundForm.length > 0) {
                foundForm = foundForm[0]
                contact.form = foundForm

            } else contact.form = null

            // Fill department data:
            let foundDepartment = state.departmentsList.filter(dep => dep.id === contact.department)
            if (foundDepartment.length > 0) {
                foundDepartment = foundDepartment[0]
                contact.department = foundDepartment

            } else contact.department = null

            // Fill worker data:
            let foundWorker = state.workersList.filter(worker => worker.id === contact.worker)
            if (foundWorker.length > 0) {
                foundWorker = foundWorker[0]
                contact.worker = foundWorker

            } else contact.worker = null

            // Fill stars data:
            let foundStar = state.starsList.filter(star => star.contact_id === contact.id)
            if (foundStar.length > 0) contact.star = true
            else contact.star = false
        }

        return {
            ...state,
            listReady: true,
            contactsList: action.payload,
            selectedContact: selected,
            error: { isError: false, message: '', code: '' }
        }
    }

    if (action.type === 'LIST_ERROR') {
        return {
            ...state,
            error: { isError: true, message: action.payload.message, code: action.payload.error },
            listReady: true
        }
    }

    if (action.type === 'SELECT_CONTACT') {
        return { ...state, selectedContact: action.payload }
    }

    if (action.type === 'UPDATE_FILTERS') {
        return { ...state, currentFilters: { ...state.currentFilters, ...action.payload } }
    }

    if (action.type === 'FILTER_SEGREGATE_CONTACTS') {
        const filteredList = filterContacts(state.contactsList, state.currentFilters)

        return { ...state, filteredSortedList: filteredList }
    }

    return { ...state }
}

export default appReducer