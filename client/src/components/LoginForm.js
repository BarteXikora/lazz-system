import { useState, useEffect, useRef } from 'react'

import { APIpost } from '../functions/api'
import useCssAnimate from '../functions/useCssAnimate'

import ButtonLoading from './ButtonLoading'

import logo from '../img/logo-dark.png'
import iconView from '../img/icon-view.png'
import iconHide from '../img/icon-unview.png'

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/

const LoginForm = ({ login, apiLink }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState('')
    const [errorCode, setErrorCode] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const warningRef = useRef(null)

    const apiLogin = async () => {
        const user = await APIpost(
            apiLink,
            '/system/users/login-user',
            {},
            { email, password }
        )

        if (!user.success) {
            setIsLoading(false)

            return setWarning(user.message || 'Wystąpił błąd.')
        }
        if (!user.data.success) {
            setIsLoading(false)

            setErrorCode(user.data.error)
            return setWarning(user.data.message || 'Wystąpił błąd.')
        }

        login(user.data.data)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!isLoading) {
            setIsLoading(true)

            if (!email || !password) {
                setWarning('Proszę wpisać adres e-mail i hasło.')

                if (!email) emailInput.current.focus()
                else passwordInput.current.focus()

                return
            }

            if (!email.match(emailRegex)) {
                setWarning('Nieprawidłowy adres e-mail.')
                emailInput.current.focus()

                return
            }

            if (password.length < 8 || password.length > 50) {
                setWarning('Hasło musi mieć między 8, a 50 znaków.')
                passwordInput.current.focus()

                return
            }

            apiLogin()
        }
    }

    useCssAnimate(warning, [{
        element: warningRef.current,
        animations: [{
            onNot: '',
            steps: [{ addCss: { padding: '5px 0', opacity: 1 } }]
        }, {
            on: '',
            steps: [{ addCss: { padding: 0, opacity: 0 } }]
        }]
    }])

    useEffect(() => {
        setWarning('')
        setErrorCode('')
    }, [email, password])

    return <div className="container-xy section-gradient d-flex align-items-center justify-content-center">
        <div className="section-login section-white text-center py-5 px-3 px-md-5 pb-4 mb-5 mb-md-0">
            <img src={logo} className='img-fluid' alt="Lazzoni Group" />

            <h2 className="font-subtitle fw-bold py-5 pb-3">Zaloguj się!</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="mb-2"
                    name="email"
                    type="email"
                    placeholder="Adres e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    ref={emailInput}
                />

                <div className="input-btn mb-3">
                    <input
                        className="mb-0"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        ref={passwordInput}
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

                <div ref={warningRef} className="transition fw-bold font-wrong">
                    {warning}

                    {
                        errorCode && <div className="mt-2 font-gray">Kod błędu: <b>{errorCode}</b></div>
                    }
                </div>

                <button type="submit" className="mt-3 btn btn-prim btn-full-width">
                    {isLoading && <ButtonLoading />}

                    Zaloguj się
                </button>
            </form>

            <div className="mt-4">
                Aby założyć konto, lub zresetować hasło skontaktuj <br />
                się z administratorem.
            </div>
        </div>
    </div>
}

export default LoginForm