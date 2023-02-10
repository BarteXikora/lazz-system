import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowContext from '../../../functions/WindowContext'
import SelectInput from '../../../components/SelectInput'
import { APIpost } from '../../../functions/api'
import ButtonLoading from '../../../components/ButtonLoading'

import iconX from '../../../img/icon-close.png'

const WindowDelegate = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { contact, workers, appDispatch } = systemState.window.data

    const [worker, setWorker] = useState(workers.length > 0 ? workers[0] : false)
    const [isLoading, setIsLoading] = useState(false)
    const [info, setInfo] = useState({ show: false, message: '', code: '' })

    useEffect(() => setInfo({ ...info, show: false }), [worker])

    const postContactWorder = async (contactID, workerID) => {
        if (workerID === null && contact.worker === null) return setInfo({
            show: true,
            message: 'Ten kontakt nie jest przekazany żadnemu pracownikowi.',
        })

        if (!worker) return setInfo({
            show: true,
            message: 'Aby przekazać zgłoszenie pracownikowi należy wybrać go z listy rozwijanej.',
        })

        if (isLoading) return
        setIsLoading(true)

        const answer = await APIpost(
            systemState.apiLink,
            '/zgloszenia/delegate-contact',
            { 'auth-token': systemState.user.authToken },
            { contactID, workerID },
        )

        if (!answer.success) {
            setInfo({
                show: true,
                message: 'Nie udało się przekazać zgłoszenia: ' + answer.message,
                code: answer.code
            })

            setIsLoading(false)
            return
        }

        if (!answer.data.success) {
            setInfo({
                show: true,
                message: answer.data.message,
                code: answer.data.error
            })

            setIsLoading(false)
            return
        }

        setIsLoading(false)
        appDispatch({ type: 'DELEGATE_CONTACT', payload: { contactID, workerID } })
        systemDispatch({ type: 'CLOSE_WINDOW' })
    }

    const navigate = useNavigate()

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>
                Przekaż zgłoszenie

                {
                    (contact.company || contact.name) && <>
                        {` od `}

                        {contact.company}
                        {contact.company && contact.name ? ', ' : ''}
                        {contact.name}
                    </>
                }

                :
            </h2>

            <p className='m-0'>
                Więcej informacji na temat przekazywania kontaktów znaleźć
                można w <button
                    className='fake-link link-help fw-bold'
                    onClick={() => {
                        systemDispatch({ type: 'CLOSE_WINDOW' })
                        systemDispatch({ type: 'SELECT_APP', payload: 'help' })
                        navigate('/help/zgloszenia')
                    }}
                >
                    centrum pomocy.
                </button>
            </p>
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-6 mb-2">
            <h3 className="font-big fw-bold">Przekaż:</h3>

            <SelectInput options={workers} state={worker} setState={setWorker} />
        </div>

        <div className="col-6 mb-3 ps-4">
            <h3 className="font-big fw-bold">Aktualnie przekazano:</h3>
            {
                contact.worker !== null ?
                    <>
                        {contact.worker.name}
                        <br />
                        <a href={`mailto:${contact.worker.email}`}>({contact.worker.email})</a>
                    </>
                    :
                    <span className="font-gray fw-bold">Nie przekazano</span>
            }

            <div style={{ height: '100px' }}></div>
        </div>

        <div className="col-12">
            {
                info.show && <div
                    className={`warning-box my-4 d-flex align-items-center justify-content-between`}
                >
                    <div>
                        <h2 className={`font-wrong font-big fw-bold m-0`}>
                            {info.message}
                        </h2>

                        {info.code && <span className='font-gray fw-bold'>Kod błędu: {info.code}</span>}
                    </div>

                    <button
                        className='btn btn-icon-small btn-x'
                        onClick={() => setInfo({ ...info, show: false })}
                    >
                        <img src={iconX} alt="Zamknij powiadomienie" />
                    </button>
                </div>
            }
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-12 d-flex d-flex justify-content-end">
            <button
                className="btn btn-sec mb-1 ms-1"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>

            <button
                className={`${contact.worker === null ? 'btn-dis' : 'btn-x'} btn mb-1 ms-3`}
                onClick={() => postContactWorder(contact.id, null)}
            >
                {(isLoading && contact.worker !== null) && <ButtonLoading />}

                <span>Usuń przekazanie</span>
            </button>

            <button
                className={`btn ${worker ? 'btn-prim' : 'btn-dis'} mb-1 ms-1`}
                onClick={() => postContactWorder(contact.id, worker.id)}
            >
                {isLoading && <ButtonLoading />}

                <span>Przekaż kontakt</span>
            </button>
        </div>
    </div>
}

export default WindowDelegate