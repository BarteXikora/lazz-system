import filterContacts from './filterContacts'
import sortContacts from './sortContacts'

const appReducer = (state, action) => {
    if (action.type === 'SET_PRIVILAGES') {
        let privilagesToSet = {
            add: action.payload.includes('add'),
            delegate: action.payload.includes('delegate'),
            download: action.payload.includes('download')
        }

        return { ...state, privilages: privilagesToSet }
    }

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

            // Fill author data:
            let foundAuthor = null
            if (contact.author === 0) foundAuthor = { id: 0, name: 'Strona internetowa' }
            else {
                foundAuthor = state.workersList.filter(worker => worker.id === contact.author)
                if (foundAuthor.length > 0) foundAuthor = foundAuthor[0]
                else foundAuthor = null
            }
            contact.author = foundAuthor
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

    if (action.type === 'FILTER_SORT_CONTACTS') {
        const filteredList = filterContacts(state.contactsList, state.currentFilters)
        const filteredSortedList = sortContacts(filteredList, state.sort)

        return { ...state, filteredSortedList }
    }

    if (action.type === 'SORT_CONTACTS') {
        const filteredList = filterContacts(state.contactsList, state.currentFilters)
        const filteredSortedList = sortContacts(filteredList, action.payload)

        return { ...state, sort: action.payload, filteredSortedList }
    }

    if (action.type === 'SET_STAR') {
        let newContacts = state.contactsList

        newContacts.forEach((contact) => {
            if (contact.id === action.payload.id) contact.star = action.payload.setTo
        })

        return { ...state, contactsList: newContacts }
    }

    if (action.type === 'DELEGATE_CONTACT') {
        let foundWorker = state.workersList.filter(worker => worker.id === action.payload.workerID)
        if (foundWorker.length > 0) {
            foundWorker = foundWorker[0]

        } else foundWorker = null

        state.contactsList.forEach(c => {
            if (c.id === action.payload.contactID) c.worker = foundWorker
        })

        return { ...state }
    }

    if (action.type === 'OPEN_CLOSE_PREVIEW') {
        return { ...state, previewShown: action.payload }
    }

    return { ...state }
}

export default appReducer