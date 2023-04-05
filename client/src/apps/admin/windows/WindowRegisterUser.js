import { useState, useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'
import _ from 'lodash'

import iconShow from '../../../img/icon-view.png'
import iconHide from '../../../img/icon-unview.png'

const WindowRegisterUser = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

        <div className="col-12 mb-5">
            <div className="info-box">
                <b>Uwaga!</b> Należy skopiować hasło użytkownika, gdyż po utworzeniu konta nie będzie można
                go odczytać.
            </div>
        </div>

        <div className="col-12 mb-2">
            Administrator systemu
        </div>

    </div>
}

export default WindowRegisterUser