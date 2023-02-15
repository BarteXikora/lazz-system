import { useState, useEffect, useContext, useRef } from 'react'
import AppContext from '../functions/AppContext'
// import moment from 'moment'

import PreviewHeader from './PreviewHeader'
// import PreviewSection from './PreviewSection'
import PreviewPresentation from './PreviewPresentation'

const ThePreview = () => {
    const { appState } = useContext(AppContext)

    const [shownContact, setShownContact] = useState({})
    const [hideEmptyFields, setHideEmptyFields] = useState(true)

    const contentRef = useRef()

    useEffect(() => {
        const found = appState.contactsList.filter(contact => contact.id === appState.selectedContact)
        const selected = found && found.length > 0 && found[0] || {}

        setShownContact(selected)

    }, [appState.selectedContact])

    return <>
        <PreviewHeader
            contentToPrint={contentRef.current}
            contact={shownContact}
            empty={{ hideEmptyFields, setHideEmptyFields }}
        />

        <div ref={contentRef}>
            <PreviewPresentation shownContact={shownContact} hideEmptyFields={hideEmptyFields} />
        </div>
    </>
}

export default ThePreview