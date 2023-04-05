import { useState, useEffect, useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'
import { Collapse } from 'react-bootstrap'
import _ from 'lodash'

import iconView from '../../../img/icon-view.png'
import iconHide from '../../../img/icon-unview.png'

const WindowRegisterUser = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { privilagesList } = systemState.window.data

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [createAdmin, setCreateAdmin] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [adminPassword, setAdminPassword] = useState('')

    const preparePrivilages = () => {
        let privilagesToSet = {}

        systemState.appsList
            .filter(app => app.id >= 0)
            .forEach(app => privilagesToSet[app.slug] = { app: false, privs: [] })

        return privilagesToSet
    }

    const [privilages, setPrivilages] = useState(preparePrivilages())

    const handleSetPrivilage = (app, priv) => {
        let privsToSet = { ...privilages }

        if (privsToSet[app].privs.includes(priv))
            privsToSet[app].privs = privsToSet[app].privs.filter(p => p !== priv)

        else privsToSet[app].privs.push(priv)

        setPrivilages(privsToSet)
    }

    const handleGeneratePassword = () => {
        const lettersCnt = 4, bigLettersCnt = 4, numbersCnt = 4, symbolsCnt = 3

        const letters = 'qwertyuiopasdfghjklzxcvbnm'
        const numbers = '1234567890'
        const symbols = '!@#$%^&*_-'

        let lettersArray = [], bigLettersArray = [], numbersArray = [], symbolsArray = []
        for (let i = 0; i < lettersCnt; i++) lettersArray.push(letters[Math.floor(Math.random() * letters.length)])
        for (let i = 0; i < bigLettersCnt; i++) bigLettersArray.push(letters[Math.floor(Math.random() * letters.length)].toUpperCase())
        for (let i = 0; i < numbersCnt; i++) numbersArray.push(numbers[Math.floor(Math.random() * numbers.length)])
        for (let i = 0; i < symbolsCnt; i++) symbolsArray.push(symbols[Math.floor(Math.random() * symbols.length)])

        let allChars = [...lettersArray, ...bigLettersArray, ...numbersArray, ...symbolsArray]

        setPassword(_.shuffle(allChars).join(''))
    }

    return <div className='row px-2'>
        <div className="col-12 mb-4">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>
                Dodaj konto użytkownika:
            </h2>
        </div>

        <div className="col-6 mb-2">
            <label>
                Imię i Nazwisko:

                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
        </div>

        <div className="col-6 mb-2">
            <label>
                Adres e-mail:

                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
        </div>

        <div className="col-6 mb-1">
            <label>
                Hasło:

                <div className="input-btn mb-3">
                    <input
                        className="mb-0"
                        type='text'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        className='btn btn-sec py-0 px-3'
                        type='button'
                        onClick={handleGeneratePassword}
                    >
                        Generuj
                    </button>
                </div>
            </label>
        </div>

        <div className="col-12 mb-4">
            <div className="info-box">
                <b>Uwaga!</b> Należy skopiować hasło użytkownika, gdyż po utworzeniu konta nie będzie można
                go odczytać. Każdy użytkownik może zmienić swoje hasło w ustawieniach.
            </div>
        </div>

        <hr className='mt-2 mb-4' />

        <div className="col-12 mb-4">
            <h3 className="fw-bold font-big mb-3">Utwórz konto z uprawnieniem "Administrator systemu":</h3>

            <div className="checkbox-container ms-1">
                <label>
                    Administrator systemu

                    <input
                        type="checkbox"
                        checked={createAdmin}
                        onChange={() => setCreateAdmin(!createAdmin)}
                    />

                    <div className="checkmark"></div>
                </label>
            </div>
        </div>

        {
            createAdmin ?

                <div className="col-12 mb-4">
                    <div className="warning-box">
                        <p className="font-big fw-bold mb-2">
                            Uwaga! Tworzenie konta z uprawnieniem "administrator systemu".
                        </p>

                        <p className='mb-2'>
                            Konto z uprawnieniem "administrator systemu" posiada automatycznie
                            dostep do wszystkich aplikacji. Posiada możliwość edycji wszystkich
                            ustawień systemu, tworzenia, edycji i usuwania kont uzytkowników itd.
                        </p>

                        <p className='fw-bold m-0'>
                            Administrator systemu ma możliwość pozbawienia Cię takiegoż uprawnienia,
                            a nawet usunięcia Twojego konta!
                        </p>
                    </div>
                </div>

                :

                <>
                    <hr className='mt-2 mb-4' />

                    <div className="col-12">
                        <h3 className="fw-bold font-big mb-3">Uprawnienia użytkownika:</h3>

                        {
                            systemState.appsList.filter(app => app.id >= 0).map(app => <>
                                <div className="checkbox-container d-block ms-1 mb-2">
                                    <label>
                                        Aplikacja <b>{app.name}</b>

                                        <input
                                            type="checkbox"
                                            checked={privilages[app.slug].app}
                                            onChange={() => setPrivilages({
                                                ...privilages,
                                                [app.slug]: { ...privilages[app.slug], app: !privilages[app.slug].app }
                                            })}
                                        />

                                        <div className="checkmark"></div>
                                    </label>
                                </div>

                                {
                                    privilagesList.filter(priv => priv.app_id === app.id).length > 0 && (
                                        <Collapse in={privilages[app.slug].app}>
                                            <div className="pt-1 pb-4 ps-4">
                                                {
                                                    privilagesList.filter(priv => priv.app_id === app.id).map(priv => (
                                                        <div className="checkbox-container d-block ms-1 mb-2">
                                                            <label>
                                                                <b>{priv.name}</b> &mdash; {priv.description}

                                                                <input
                                                                    type="checkbox"
                                                                    checked={privilages[app.slug].privs.includes(priv.id)}
                                                                    onChange={() => handleSetPrivilage(app.slug, priv.id)}
                                                                />

                                                                <div className="checkmark"></div>
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </Collapse>
                                    )
                                }
                            </>)
                        }

                        <div className="info-box mt-4 mb-3">
                            <b>Uwaga!</b> Zaznaczenie checkboxa z uprawnieniem "Aplikacja: <b>Nazwa aplikacji</b>"
                            jest jednoznaczne z przydzieleniem użytkownikowi uprawnień dostępu do
                            zaznaczonej aplikacji. Przydzielenie dostepu do aplikacji rozwinie
                            uprawnienia wewnątrz tej aplikacji.
                        </div>
                    </div>
                </>
        }

        <hr className='mt-2 mb-4' />

        <div className="col-6">
            <span className="fw-bold">
                Podaj swoje hasło w celu weryfikacji:
            </span>

            <div className="input-btn mt-2 mb-3">
                <input
                    className="mb-0"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    autoComplete="new-password"
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
        </div>

        <div className="col-12 d-flex justify-content-end">
            <button
                className="btn btn-sec ms-2 mb-1"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>

            <button className="btn btn-prim ms-2 mb-1">Utwórz konto</button>
        </div>
    </div>
}

export default WindowRegisterUser