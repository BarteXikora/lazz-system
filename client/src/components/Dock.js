import { useRef } from 'react'

import DockButton from './DockButton'

import useCssAnimate from '../functions/useCssAnimate'

// Imports images:
import logoLazzoni from '../img/logo.png'
import iconHelp from '../img/icon-help.png'
import iconAdmin from '../img/icon-administration.png'
import iconSettings from '../img/icon-settings.png'
import iconLogOut from '../img/icon-logout.png'
import iconClose from '../img/icon-close.png'

const Dock = ({ appsList, shown, closeAll }) => {
    appsList = [] // __dev

    // Animates Dock:
    const dockRef = useRef(null)
    const closeBtnRef = useRef(null)
    useCssAnimate(shown, [{
        element: dockRef.current,
        onTrue: [{ addClass: ['drawer-slide-in-left'], removeClass: ['d-none'] }],
        onFalse: [
            { addClass: ['drawer-slide-out-left'] },
            { delay: 200, addClass: ['d-none'], removeClass: ['drawer-slide-in-left', 'drawer-slide-out-left'] }
        ]
    }, {
        element: closeBtnRef.current,
        onTrue: [{ addClass: ['btn-fade-in'], removeClass: ['d-none'] }],
        onFalse: [
            { addClass: ['fade-out'] },
            { delay: 200, addClass: ['d-none'], removeClass: ['btn-fade-in', 'fade-out'] }
        ]
    }])

    return <section ref={dockRef} className={`d-none drawer section-gradient`}>
        <button
            ref={closeBtnRef}
            className={`drawer-close btn btn-wrong btn-icon`}
            onClick={closeAll}
        >
            <img src={iconClose} alt="Zamknij Dock!" />
        </button>

        <div className="h-100 d-flex flex-column justify-content-between p-4 pe-5">
            <div>
                <img src={logoLazzoni} height="16" alt="Lazzoni Group" className="ps-2 mb-2" />

                <hr />
            </div>

            {
                appsList.length > 0 ?
                    <div className='h-100 py-2'>
                        {
                            appsList.map((app, i) => <DockButton
                                key={i}
                                icon={`/img/icon-app-${app.slug}.png`}
                                label={`Otwórz aplikację ${app.name}`}
                                title={app.name}
                            />)
                        }
                    </div>

                    : <div className="h-100 py-5 text-center font-wrong">
                        [ Nie znaleziono aplikacji ]
                    </div>
            }

            <hr />

            <div className="d-flex flex-column align-items-start pe-3">

                <DockButton icon={iconHelp} label='Otwórz centrum pomocy' title='Pomoc' />

                <div className='py-3'></div>

                <DockButton icon={iconAdmin} label='Administracja systemem' title='Administracja' />
                <DockButton icon={iconSettings} label='Ustawienia' title='Ustawienia' />
                <DockButton icon={iconLogOut} label='Wyloguj się z systemu' title='Wyloguj się' />

            </div>
        </div>
    </section>
}

export default Dock