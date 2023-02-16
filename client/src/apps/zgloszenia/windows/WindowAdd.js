import { useState, useEffect, useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'
import { useNavigate } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'

import iconDropdown from '../../../img/icon-arrow-down.png'

const WindowAdd = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { openWindow, getForm, reload } = systemState.window.data

    const emptyForm = {
        company: '',
        name: '',
        tel: '',
        email: '',
        topic: '',
        message: '',
        country: '',
        address: '',
        nip: '',
        brand: '',
        si: '',
        cycles: ''
    }

    const [isFullFormShown, setIsFullFormShown] = useState(false)
    const [form, setForm] = useState(getForm || emptyForm)
    const [warning, setWarning] = useState(false)

    const handleNext = () => {
        if (form.tel || form.email) openWindow('confirm', { form, openWindow, reload })
        else setWarning(true)
    }

    useEffect(() => setWarning(false), [form])
    useEffect(() => {
        setWarning(false)
        setIsFullFormShown(false)
    }, [systemState.window])

    const navigate = useNavigate()

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>
                Dodaj kontakt
            </h2>

            <p className='m-0'>
                Więcej informacji na temat dodawania kontaktów znaleźć
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

        <div className="col-12 mb-2">
            <h3 className="font-big fw-bold">Dane podstawowe:</h3>
        </div>

        <div className="col-6 mb-2">
            <label>
                <span className='fw-bold'>Numer telefonu: <span className="font-wrong fw-bold">*</span></span>
                <input
                    type="text"
                    className={`${warning && 'input-wrong'} mb-2`}
                    value={form.tel}
                    onChange={(e) => setForm({ ...form, tel: e.target.value })}
                />
            </label>

            <label>
                <span className='fw-bold'>Adres e-mail: <span className="font-wrong fw-bold">*</span></span>
                <input
                    type="text"
                    className={`${warning && 'input-wrong'} mb-2`}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </label>
        </div>

        <div className="col-6 mb-2">
            <label>
                <span>Nazwa firmy:</span>
                <input type="text" className='mb-2' value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </label>

            <label>
                <span>Imię i nazwisko, nazwa:</span>
                <input type="text" className='mb-2' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
        </div>

        <div className="col-12 mt-4 mb-2">
            <label>
                <span>Tytuł wiadomości:</span>
                <input type="text" className='mb-2' value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
            </label>

            <label>
                <span>Treść wiadomości:</span>
                <textarea className='mb-2' value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
            </label>
        </div>

        <div className="col-12 mt-4 mb-2">
            <button
                className="btn btn-tr btn-icon-text"
                onClick={() => setIsFullFormShown(!isFullFormShown)}
            >
                <img
                    src={iconDropdown}
                    alt="Rozwiń / zwiń pozostałe pola formularza"
                    style={{
                        transition: 'all .2s ease-in-out',
                        transform: isFullFormShown ? 'rotateZ(180deg)' : ''
                    }}
                />

                <span>{isFullFormShown ? 'Schowaj' : 'Pokaż'} pozostałe pola formularza</span>
            </button>
        </div>


        <Collapse in={isFullFormShown}>
            <div className='col-12 mb-2'>
                <div className="row">
                    <div className="col-12 mb-2"><hr /></div>

                    <div className="col-6 mb-2">
                        <h3 className="font-big fw-bold mb-3">Szczegóły:</h3>

                        <label>
                            <span>Kraj zgłoszenia:</span>
                            <input type="text" className='mb-2' value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                        </label>

                        <label>
                            <span>Adres klienta:</span>
                            <input type="text" className='mb-2' value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        </label>

                        <label>
                            <span>NIP, lub VAT EU:</span>
                            <input type="text" className='mb-2' value={form.nip} onChange={(e) => setForm({ ...form, nip: e.target.value })} />
                        </label>
                    </div>

                    <div className="col-6 mb-2">
                        <h3 className="font-big fw-bold mb-3">Dane urządzenia:</h3>

                        <label>
                            <span>Marka / model:</span>
                            <input type="text" className='mb-2' value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                        </label>

                        <label>
                            <span>Numer seryjny:</span>
                            <input type="text" className='mb-2' value={form.si} onChange={(e) => setForm({ ...form, si: e.target.value })} />
                        </label>

                        <label>
                            <span>Liczba wykonanych cykli:</span>
                            <input type="text" className='mb-2' value={form.cycles} onChange={(e) => setForm({ ...form, cycles: e.target.value })} />
                        </label>
                    </div>
                </div>
            </div>
        </Collapse>

        {
            warning && <div className="col-12 mb-2">
                <div className="warning-box">
                    <h3 className="font-big fw-bold m-0">
                        Należy uzupełnić przynajmniej jedo pole kontaktowe!
                    </h3>

                    <p className='m-0'>
                        Aby dodać kontakt wymagane jest uzupełnienie przynajmniej jednogo z
                        pól: <br /> <b>Numer telefonu I/LUB Adres e-mail.</b>
                    </p>
                </div>
            </div>
        }

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-12 d-flex justify-content-between">
            <button className="btn btn-x ms-2 mb-1" onClick={() => setForm(emptyForm)}>
                Wyczyść formularz
            </button>

            <div>
                <button
                    className="btn btn-sec ms-2 mb-1"
                    onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
                >
                    Anuluj
                </button>

                <button
                    className={`btn ${form.tel || form.email ? 'btn-prim' : 'btn-dis'} ms-2 mb-1`}
                    onClick={handleNext}
                >
                    Dalej...
                </button>
            </div>
        </div>
    </div>
}

export default WindowAdd