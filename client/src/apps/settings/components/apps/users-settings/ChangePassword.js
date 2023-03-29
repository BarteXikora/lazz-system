import { useState, useEffect } from 'react'
import ButtonLoading from '../../../../../components/ButtonLoading'

import iconView from '../../../../../img/icon-view.png'
import iconHide from '../../../../../img/icon-unview.png'
import picSuccess from '../../../../../img/pic-success.png'

const ChangePassword = () => {
    const emptyForm = { newPassword: '', repeatPassword: '', currentPassword: '' }

    const [form, setForm] = useState(emptyForm)
    const [showPasswords, setShowPasswords] = useState({ newPasswords: false, currentPassword: false })
    const [liveValidate, setLiveValidate] = useState({ ok: false, message: '', code: '', showInfo: false })
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (!form.newPassword || !form.repeatPassword || !form.currentPassword) return setLiveValidate({
            ...liveValidate,
            ok: false,
            message: 'Należy uzupełnić wszystkie pola formularza.',
            code: '',
            showInfo: false
        })

        if (form.newPassword.length < 8 || form.newPassword.length > 50) return setLiveValidate({
            ...liveValidate,
            ok: false,
            message: 'Hasło musi mieć przynajmniej 8, a maksymalnie 50 znaków.',
            code: '',
            showInfo: false
        })

        if (form.newPassword !== form.repeatPassword) return setLiveValidate({
            ...liveValidate,
            ok: false,
            message: 'Hasła nie są identyczne.',
            code: '',
            showInfo: false
        })

        if (form.currentPassword.length < 8 || form.currentPassword.length > 50) return setLiveValidate({
            ...liveValidate,
            ok: false,
            message: 'Aktualne hasło musi mieć przynajmniej 8, a maksymalnie 50 znaków.',
            code: '',
            showInfo: false
        })

        setLiveValidate({ ...liveValidate, ok: true, showInfo: false })

    }, [form])

    const handleSubmit = () => {
        if (isLoading) return

        if (!liveValidate.ok) return setLiveValidate({ ...liveValidate, showInfo: true })

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setShowSuccess(true)
            setForm(emptyForm)
        }, 5000)
    }

    return <div className="col-6">
        <h4 className="font-big fw-bold mb-3">Zmiana hasła:</h4>

        <div className="row m-0 px-1">
            <div className="col-10 p-0 pe-2">

                {
                    showSuccess ?

                        <div className='w-100 d-flex align-items-center section-gray-l'>
                            <img src={picSuccess} />

                            <div className="mx-3 py-4 mt-1">
                                <h4 className="font-subtitle fw-bold">
                                    Hasło zostało zmienione!
                                </h4>

                                <p>
                                    Od teraz możesz zalogować się do systemu tylko z użyciem
                                    nowego hasła.
                                </p>

                                <button
                                    className="btn btn-sec"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    Wróć do formularza
                                </button>
                            </div>
                        </div>

                        :

                        <>
                            <label className='d-block mb-3'>
                                Utwórz nowe hasło:

                                <div className="input-btn">
                                    <input
                                        type={showPasswords.newPasswords ? 'text' : 'password'}
                                        value={form.newPassword}
                                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                        autoComplete='new-password'
                                    />

                                    <button
                                        className={`${showPasswords.newPasswords && 'active'} btn btn-icon-small`}
                                        type='button'
                                        onClick={() => {
                                            setShowPasswords({ ...showPasswords, newPasswords: !showPasswords.newPasswords })
                                        }}
                                    >
                                        <img
                                            src={showPasswords.newPasswords ? iconView : iconHide}
                                            alt="Pokaż / ukryj hasło"
                                        />
                                    </button>
                                </div>
                            </label>

                            <label className='d-block mb-5'>
                                Powtórz nowe hasło:

                                <div className="input-btn">
                                    <input
                                        type={showPasswords.newPasswords ? 'text' : 'password'}
                                        value={form.repeatPassword}
                                        onChange={(e) => setForm({ ...form, repeatPassword: e.target.value })}
                                        autoComplete='new-password'
                                    />

                                    <button
                                        className={`${showPasswords.newPasswords && 'active'} btn btn-icon-small`}
                                        type='button'
                                        onClick={() => {
                                            setShowPasswords({ ...showPasswords, newPasswords: !showPasswords.newPasswords })
                                        }}
                                    >
                                        <img
                                            src={showPasswords.newPasswords ? iconView : iconHide}
                                            alt="Pokaż / ukryj hasło"
                                        />
                                    </button>
                                </div>
                            </label>

                            <label className='d-block mb-5'>
                                Aktualne hasło w celu weryfikacji:

                                <div className="input-btn">
                                    <input
                                        type={showPasswords.currentPassword ? 'text' : 'password'}
                                        value={form.currentPassword}
                                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                                        autoComplete='off'
                                    />

                                    <button
                                        className={`${showPasswords.currentPassword && 'active'} btn btn-icon-small`}
                                        type='button'
                                        onClick={() => {
                                            setShowPasswords({ ...showPasswords, currentPassword: !showPasswords.currentPassword })
                                        }}
                                    >
                                        <img
                                            src={showPasswords.currentPassword ? iconView : iconHide}
                                            alt="Pokaż / ukryj hasło"
                                        />
                                    </button>
                                </div>
                            </label>

                            {
                                liveValidate.showInfo && <div className="warning-box my-4">
                                    <span className="font-wrong font-big fw-bold">{liveValidate.message}</span>
                                    {liveValidate.code && <span className="font-gray">{liveValidate.code}</span>}
                                </div>
                            }

                            <button
                                className={`btn ${isLoading ? 'btn-dis' : 'btn-sec'} me-2 mb-1`}
                                onClick={() => {
                                    if (!isLoading) {
                                        setForm(emptyForm)
                                        setShowPasswords({ newPasswords: false, currentPassword: false })
                                    }
                                }}
                            >
                                Wyczyść formularz
                            </button>

                            <button
                                className={`btn ${liveValidate.ok ? 'btn-prim' : 'btn-dis'} me-2 mb-1`}
                                onClick={handleSubmit}
                            >
                                {isLoading && <ButtonLoading />}

                                Zmień hasło
                            </button>
                        </>

                }
            </div>
        </div>
    </div>
}

export default ChangePassword