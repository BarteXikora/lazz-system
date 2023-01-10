import { useState, useEffect } from 'react'
import noAppPic from '../img/pic-not-found.png'

const AppNotFound = ({ systemNavigate }) => {
    const [countDown, setCountDown] = useState(10)

    useEffect(() => {
        if (countDown > 0) setTimeout(() => {
            setCountDown(countDown - 1)
        }, 1000)

        if (countDown === 0) systemNavigate('/')
    }, [countDown])

    return <div
        className="container-xy section-gradient-s d-flex align-items-center justify-content-center"
    >
        <div className="text-center mb-5 pb-5">
            <img src={noAppPic} alt="404" />

            <h2 className="font-subtitle fw-bold mt-4 mb-2">
                Nie znaleziono aplikacji!
            </h2>

            <p>
                Przekierowywanie do aplikacji <b>Zgłoszenia</b> &mdash; ({countDown} s)
            </p>

            <button className="btn btn-sec mt-3">Przejdź do aplikacji Zgłoszenia</button>
        </div>
    </div>
}

export default AppNotFound