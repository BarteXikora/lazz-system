import { useState, useEffect, useContext, useRef } from 'react'
import AppContext from '../functions/AppContext'
// import moment from 'moment'

import PreviewHeader from './PreviewHeader'
// import PreviewSection from './PreviewSection'
import PreviewPresentation from './PreviewPresentation'

import iconLeft from '../../../img/icon-arrow-left.png'

const ThePreview = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [shownContact, setShownContact] = useState({})
    const [hideEmptyFields, setHideEmptyFields] = useState(true)

    const contentRef = useRef()

    useEffect(() => {
        const found = appState.contactsList.filter(contact => contact.id === appState.selectedContact)
        const selected = found && found.length > 0 && found[0] || {}

        setShownContact(selected)

    }, [appState.selectedContact])

    return <>
        <div className="d-flex d-lg-none sticky-top">
            <button
                className="btn btn-prim btn-icon-text btn-full-width d-flex justify-content-start align-items-center"
                onClick={() => appDispatch({ type: 'OPEN_CLOSE_PREVIEW', payload: false })}
            >
                <img src={iconLeft} alt="Wróć do listy" />

                <span>Wróć do listy</span>
            </button>
        </div>

        <PreviewHeader
            contentToPrint={contentRef.current}
            contact={shownContact}
            empty={{ hideEmptyFields, setHideEmptyFields }}
        />

        <div ref={contentRef}>
            <PreviewPresentation shownContact={shownContact} hideEmptyFields={hideEmptyFields} />
        </div>

        <div className="my-5 py-5 my-md-0 py-md-0"></div>
    </>
}

export default ThePreview