import { useState, useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'
import _ from 'lodash'

import iconView from '../../../img/icon-view.png'
import iconHide from '../../../img/icon-unview.png'

const WindowRegisterUser = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [createAdmin, setCreateAdmin] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [adminPassword, setAdminPassword] = useState('')

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
                go odczytać.
            </div>
        </div>

        <hr className='mt-2 mb-4' />

        <div className="col-12 mb-4">
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

                <>hehe</>
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
                    placeholder="Hasło"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    autocomplete="new-password"
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