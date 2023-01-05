import { useState, useEffect, useRef } from 'react'

import useCssAnimate from '../functions/useCssAnimate'

import Notification from './Notification'

// Imports images:
import iconClose from '../img/icon-close.png'
import iconDotsVertical from '../img/icon-dots-vertical.png'
import picEmpty from '../img/pic-empty.png'
import iconArchive from '../img/icon-archive.png'

const NotificationsCenter = ({ shown, notificationsList, closeAll }) => {
    notificationsList = [] // __dev

    // Checks for new Notes:
    const [anyNewNotes, setAnyNewNotes] = useState(false)
    useEffect(() => {
        let newNotes = false

        for (const note of notificationsList)
            if (note.status === 0 || note.status === 1)
                newNotes = true

        setAnyNewNotes(newNotes)
    })

    // Animates Notifications Center:
    const ncRef = useRef(null)
    const closeBtnRef = useRef(null)
    useCssAnimate(shown, [{
        element: ncRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['drawer-slide-in-right'], remClass: ['d-none'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['drawer-slide-out-right'] },
                {
                    delay: 200,
                    addClass: ['d-none'],
                    remClass: ['drawer-slide-in-right', 'drawer-slide-out-right']
                }
            ]
        }]
    }, {
        element: closeBtnRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['btn-fade-in'], remClass: ['d-none'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['fade-out'] },
                {
                    delay: 200,
                    addClass: ['d-none'],
                    remClass: ['btn-fade-in', 'fade-out']
                }
            ]
        }]
    }])

    return (
        <section ref={ncRef} className="d-none drawer drawer-right section-white" >
            <button onClick={closeAll} ref={closeBtnRef} className="drawer-close btn btn-wrong btn-icon">
                <img src={iconClose} alt="Zamknij Dock!" />
            </button>

            <div className="h-100 d-flex flex-column justify-content-between p-4">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="font-subtitle fw-bold ps-2 m-0">Powiadomienia:</h2>

                    <button title="Rozwiń dodatkowe opcje" className="btn btn-icon">
                        <img src={iconDotsVertical} alt="Zobacz opcje" />
                    </button>

                    {/* <div class="floating-menu section-black p-2">
                        <button class="btn-sec py-1">Oznacz wszystkie jako przeczytane</button>
                        <button class="btn-sec py-1">Oznacz wszystkie jako nieprzeczytane</button>
                        <button class="btn-sec py-1">Archiwizuj wszystkie przeczytane</button>
                        <button class="btn-sec py-1">Archiwizuj wszystkie</button>
                    </div> */}
                </div>

                <hr />

                {
                    anyNewNotes ? (
                        <div className="h-100 py-4">
                            {
                                notificationsList.map((notification) => {
                                    // statuses: 0 - new, 1 - viewed, 2 - archivized not viewed, 3 - arch.
                                    if (notification.status === 0 || notification.status === 1) return (
                                        <Notification key={notification.id} {...notification} />
                                    )
                                })
                            }
                        </div>

                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center px-5">
                            <div className="d-block text-center mb-5">
                                <img src={picEmpty} alt="Brak powiadomień" />

                                <h2 className="font-subtitle font-gray-d fw-bold">
                                    Nie masz nowych <br /> powiadomień!
                                </h2>
                            </div>
                        </div>
                    )
                }

                <hr />

                <div className="d-flex justify-content-center">
                    <button title='Wyświetl zarchiwizowane powiadomienia' className="btn btn-dock btn-icon">
                        <img src={iconArchive} alt="Zarchiwizowane" />
                        <span>Zarchiwizowane</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default NotificationsCenter