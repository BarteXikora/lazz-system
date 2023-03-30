import { useState, useEffect, useContext } from 'react'
import SystemContext from '../../../../../functions/SystemContext'

import iconView from '../../../../../img/icon-view.png'
import iconHide from '../../../../../img/icon-unview.png'
import iconX from '../../../../../img/icon-close.png'

const ChangeData = () => {
    const { systemState } = useContext(SystemContext)

    const resetForm = () => {
        return {
            name: systemState.user.name,
            email: systemState.user.email,
            password: ''
        }
    }

    const [form, setForm] = useState(resetForm())
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({ ok: false, message: '', code: '', show: false })

    useEffect(() => {
        if (!form.name || !form.email || !form.password) return setError({
            ok: false,
            message: 'Należy uzupełnić wszystkie pola formularza.',
            code: '',
            show: error.show
        })

        if (form.name === resetForm().name && form.email === resetForm().email) return setError({
            ok: false,
            message: 'Nie wprowadzono żadnych zmian.',
            code: '',
            show: error.show
        })

        setError({
            ok: true,
            show: false
        })

    }, [form])

    const handleSubmit = () => {
        if (!error.ok) return setError({ ...error, show: true })
    }

    return <div className="col-6 px-1">
        <h4 className="font-big fw-bold mb-3">Zmiana danych użytkownika:</h4>

        <div className="row m-0 px-1">
            <div className="col-10 p-0 pe-2">
                <label className="mb-2">
                    Adres e-mail:

                    <input
                        type="email"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </label>

                <label className="mb-4">
                    Imię i nazwisko:

                    <input
                        type="text"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </label>

                <label className='d-block mb-4'>
                    Aktualne hasło w celu weryfikacji:

                    <div className="input-btn mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            autoComplete='new-password'
                        />

                        <button
                            className={`${showPassword && 'active'} btn btn-icon-small`}
                            type='button'
                            onClick={() => {
                                setShowPassword(!showPassword)
                            }}
                        >
                            <img src={showPassword ? iconView : iconHide} alt="Pokaż / ukryj hasło" />
                        </button>
                    </div>
                </label>

                {
                    error.show && <div className="warning-box my-4 d-flex align-items-center justify-content-between">
                        <div className="font-big font-wrong fw-bold">{error.message}</div>

                        <button
                            className='btn btn-icon-small btn-x'
                            onClick={() => setError({ ...error, show: false })}
                        >
                            <img src={iconX} />
                        </button>
                    </div>
                }

                <div className='mt-5'>
                    <button
                        className="btn btn-sec me-2 mb-2"
                        onClick={() => setForm(resetForm())}
                    >
                        Przywróć aktualne
                    </button>

                    <button
                        className={`btn ${error.ok ? 'btn-sec' : 'btn-dis'} me-2 mb-2`}
                        onClick={handleSubmit}
                    >
                        Zmień dane użytkownika
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ChangeData