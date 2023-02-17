import { useState, useContext, useEffect } from 'react'
import WindowContext from '../../../functions/WindowContext'
import PreviewPresentation from '../components/PreviewPresentation'
import ButtonLoading from '../.././../components/ButtonLoading'
import { APIpost } from '../../../functions/api'

import iconX from '../../../img/icon-close.png'
import picSuccess from '../img/pic-sent.png'

const WindowAddConfirm = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { openWindow, form, reload } = systemState.window.data

    const [theForm, setTheForm] = useState(form)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({ show: false, message: '', code: '' })
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setTheForm({
            ...theForm,
            form: { id: 0, name: 'Infolinia' },
            author: { id: systemState.user.id, name: systemState.user.name },
        })

    }, [])

    const handleAddContact = async () => {
        if (isLoading) return

        setError({ ...error, show: false })
        setIsLoading(true)

        const answer = await APIpost(
            systemState.apiLink,
            '/zgloszenia/post-contact',
            { 'auth-token': systemState.user.authToken },
            { ...theForm, form: 0, author: theForm.author.id },
        )

        setIsLoading(false)

        if (!answer.success) return setError({
            show: true,
            message: 'Nie udało się dodać kontaktu do listy!',
            code: '@ZGLOSZENIA/post-contact#00'
        })

        if (!answer.data.success) return setError({
            show: true,
            message: answer.data.message,
            code: answer.data.error
        })

        setError(false)
        setSuccess(true)
        reload()
    }

    return <div className='row px-2'>
        {
            success ?
                <div className="col-12 mb-4 d-flex flex-column flex-sm-row text-center text-sm-start align-items-center justify-content-center">
                    <img src={picSuccess} alt="Wysłano kontakt!" className='mb-3' />

                    <div className='ms-4 me-5'>
                        <h2 className="fw-bold font-title font-sec">
                            Dodano kontakt do listy!
                        </h2>

                        <p className='mb-4'>
                            Kontakt został dodany do listy.
                        </p>

                        <button
                            className="btn btn-prim me-2 mb-1"
                            onClick={() => openWindow('add', { openWindow, getForm: null })}
                        >
                            Dodaj kolejny kontakt
                        </button>

                        <button
                            className="btn btn-sec me-2 mb-1"
                            onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
                        >
                            OK
                        </button>
                    </div>
                </div>

                :

                <div className="col-12 mb-2">
                    <h2 className="font-subtitle fw-bold">Czy na pewno chcesz dodać ten kontakt?</h2>

                    <p className='mb-4'>
                        Przed dodaniem kontaktu proszęupewnić się, że wszystkie dane są prawidłowe. <br />
                        Nie ma możliwości edycji, lub usunięcia kontaktu z listy.
                    </p>

                    <button
                        className="btn btn-sec me-2 mb-1"
                        onClick={() => openWindow('add', { openWindow, getForm: form })}
                    >
                        Wróć do edycji...
                    </button>
                    <button className="btn btn-prim me-2 mb-1" onClick={handleAddContact}>
                        {isLoading && <ButtonLoading />}

                        Dodaj kontakt
                    </button>
                </div>
        }

        {
            error.show && <div className="col-12 mt-4 mb-2">
                <div className="warning-box d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="font-big fw-bold font-wrong m-0">{error.message}</h2>

                        <p className='m-0'>
                            Proszę spróbować ponownie, a jeżeli błąd będzie się powtarzał, proszę
                            skontaktować się z administratorem.
                        </p>

                        <p className='font-gray fw-bold m-0 mt-2'>
                            Kod błędu: {error.code}
                        </p>
                    </div>

                    <button
                        className="btn btn-sec btn-icon-small"
                        onClick={() => setError({ ...error, show: false })}
                    >
                        <img src={iconX} alt="Zamknij powiadomienie" />
                    </button>
                </div>
            </div>
        }

        <div className="col-12 mb-2"><hr /></div>

        <PreviewPresentation shownContact={theForm} hideEmptyFields={false} />
    </div>
}

export default WindowAddConfirm