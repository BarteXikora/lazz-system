import { useState, useEffect, useContext, useRef } from 'react'
import AppContext from '../functions/AppContext'
import moment from 'moment'

import PreviewHeader from './PreviewHeader'
import PreviewSection from './PreviewSection'

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
            <PreviewSection
                title='Szczegóły zgłoszenia'
                fields={[
                    { label: 'Formularz', value: shownContact.form ? shownContact.form.name : null },
                    {
                        label: 'Dział',
                        value: shownContact.department ?
                            <>
                                {shownContact.department.name} {' '}

                                (<a href={`mailto:${shownContact.department.email}`} target='_blank'>
                                    {shownContact.department.email}
                                </a>)
                            </>
                            : null
                    },
                    {
                        label: 'Czas otrzymania zgłoszenia',
                        value: moment(shownContact.date).isValid() ?
                            moment(shownContact.date).format('DD.MM.YYYY, HH:mm')
                            :
                            <span className="font-gray fw-bold">[ brak danych ]</span>
                    },
                    {
                        label: 'Przekazano',
                        value: shownContact.worker ?
                            <>
                                {shownContact.worker.name} {' '}

                                (<a href={`mailto:${shownContact.worker.email}`} target='_blank'>
                                    {shownContact.worker.email}
                                </a>)
                            </>
                            : null
                    },
                    { label: 'Autor zgłoszenia', value: shownContact.author ? shownContact.author.name : null },
                    { label: 'Typ zgłoszenia', value: shownContact.type }
                ]}
                hideEmptyFields={hideEmptyFields}
            />

            <PreviewSection
                title='Dane kontaktowe'
                fields={[
                    { label: 'Imię i nazwisko, nazwa', value: shownContact.name },
                    { label: 'Nazwa firmy', value: shownContact.company },
                    {
                        label: 'Adres e-mail',
                        value: shownContact.email ?
                            <a href={`mailto:${shownContact.email}`} target='_blank'>{shownContact.email}</a>
                            : null
                    }, {
                        label: 'Numer telefonu',
                        value: shownContact.tel ?
                            <a href={`tel:${shownContact.tel}`} target='_blank'>{shownContact.tel}</a>
                            : null
                    },
                    { label: 'Adres', value: shownContact.address },
                    { label: 'NIP, lub VAT EU', value: shownContact.nip }
                ]}
                hideEmptyFields={hideEmptyFields}
            />

            <PreviewSection
                title='Wiadomość'
                fields={[
                    { label: 'Temat', value: shownContact.topic, fullWidth: true },
                    { label: 'Treść wiadomości', value: shownContact.message, fullWidth: true }
                ]}
                hideEmptyFields={hideEmptyFields}
            />

            <PreviewSection
                title='Informacje dodatkowe'
                fields={[
                    { label: 'Kraj zgłoszenia', value: shownContact.country },
                    { label: 'Marka i model', value: shownContact.brand },
                    { label: 'Numer seryjny', value: shownContact.si },
                    { label: 'Liczba wykonanych cykli', value: shownContact.cycles },
                ]}
                hideEmptyFields={hideEmptyFields}
            />
        </div>
    </>
}

export default ThePreview