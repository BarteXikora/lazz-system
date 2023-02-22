import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowContext from '../../../functions/WindowContext'

import iconX from '../../../img/icon-close.png'

const WindowMail = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { contact, sendMail } = systemState.window.data

    const [warning, setWarning] = useState({ show: false, message: '' })

    useEffect(() => setWarning({ show: false, message: '' }), [systemState.window])

    const navigate = useNavigate()

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>Wyślij wiadomość e-mail:</h2>

            <p className='m-0'>
                Więcej informacji na temat wysyłania kontaktów mailowo znaleźć
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

        <div className="col-12 d-flex flex-column flex-sm-row">
            <button className='btn btn-prim mb-3' onClick={() => sendMail(contact)}>
                Wyślij e-mail z danymi
            </button>
        </div>

        <div className="col-12 d-flex flex-column flex-sm-row">
            <button
                className='btn btn-prim mb-1 me-sm-2'
                onClick={() => sendMail(contact, systemState.user.email)}
            >
                Wyślij do siebie
            </button>

            <button
                className={`btn ${contact.email ? 'btn-prim' : 'btn-dis'} mb-1 me-sm-2`}
                onClick={
                    () => contact.email ?
                        sendMail(contact, contact.email)
                        :
                        setWarning({ show: true, message: 'Nie można wykonać tej operacji, ponieważ klient nie podał adresu e-mail.' })
                }
            >
                Wyślij do klienta
            </button>

            <button
                className={`btn ${contact.worker !== null ? 'btn-prim' : 'btn-dis'} mb-1 me-sm-2`}
                onClick={
                    () => contact.worker !== null ?
                        sendMail(contact, contact.worker.email)
                        :
                        setWarning({ show: true, message: 'Nie można wykonać tej operacji, ponieważ kontakt nie został przekazany żadnemu pracownikowi.' })
                }
            >
                Wyślij do pracownika
            </button>
        </div>


        {
            warning.show && <div className='col-12 mb-2'>
                <div className="warning-box my-4 d-flex align-items-center justify-content-between">
                    <h2 className='font-big fw-bold font-wrong m-0 me-4'>{warning.message}</h2>

                    <button className='btn btn-x btn-icon-small' onClick={() => setWarning({ show: false, message: '' })}>
                        <img src={iconX} alt="Zamknij powiadomienie" />
                    </button>
                </div>
            </div>
        }

        <div>
            <div className="col-12 mb-2"><hr /></div>

            <div className="col-12 mt-2 d-flex flex-column flex-sm-row justify-content-end">
                <button className="btn btn-sec" onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}>
                    Anuluj
                </button>
            </div>
        </div>
    </div>
}

export default WindowMail