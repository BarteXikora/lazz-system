import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useCssAnimate from '../functions/useCssAnimate'

import DockButton from './DockButton'
import SystemContext from '../functions/SystemContext'

// Imports images:
import logoLazzoni from '../img/logo.png'
import iconHelp from '../img/icon-help.png'
import iconAdmin from '../img/icon-administration.png'
import iconSettings from '../img/icon-settings.png'
import iconLogOut from '../img/icon-logout.png'
import iconClose from '../img/icon-close.png'

const Dock = () => {
    // Gets system context:
    const { systemState, systemDispatch } = useContext(SystemContext)

    // Animates Dock:
    const dockRef = useRef(null)
    const closeBtnRef = useRef(null)
    useCssAnimate(systemState.isDockShown, [{
        element: dockRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['drawer-slide-in-left'], remClass: ['d-none'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['drawer-slide-out-left'] },
                {
                    delay: 200,
                    addClass: ['d-none'],
                    remClass: ['drawer-slide-in-left', 'drawer-slide-out-left']
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

    // Handles dock button click event:
    const systemNavigate = useNavigate()
    const handleClick = (slug) => {
        if (slug !== systemState.currentApp) {
            systemDispatch({ type: 'SELECT_APP', payload: slug })
            systemDispatch({ type: 'CLOSE_ALL' })
            systemNavigate(`/${slug}`)
        }
    }

    // Count apps:
    const [appsCount, setAppsCount] = useState(0)
    useEffect(() => {
        let cnt = 0
        for (const app of systemState.appsList) if (app.id > 0) cnt++
        setAppsCount(cnt)

    }, [systemState.appsList])

    return <section ref={dockRef} className={`d-none drawer section-gradient`}>
        <button
            ref={closeBtnRef}
            className={`drawer-close btn btn-wrong btn-icon`}
            onClick={() => systemDispatch({ type: 'CLOSE_ALL' })}
        >
            <img src={iconClose} alt="Zamknij Dock!" />
        </button>

        <div className="h-100 d-flex flex-column justify-content-between p-4 pe-5">
            <div>
                <img src={logoLazzoni} height="16" alt="Lazzoni Group" className="ps-2 mb-2" />

                <hr />
            </div>

            {
                appsCount > 0 ?
                    <div className='h-100 py-2'>
                        {
                            systemState.appsList.map((app, i) => app.id > 0 && <DockButton
                                key={app.id}
                                icon={`/img/icon-app-${app.slug}.png`}
                                label={`Otwórz aplikację ${app.name}`}
                                title={app.name}
                                classActive={systemState.currentApp === app.slug}
                                action={() => handleClick(app.slug)}
                            />)
                        }
                    </div>

                    : <div className="h-100 py-5 text-center font-wrong">
                        [ Nie znaleziono aplikacji ]
                    </div>
            }

            <hr />

            <div className="d-flex flex-column align-items-start pe-3">

                <DockButton
                    icon={iconHelp}
                    label='Otwórz centrum pomocy'
                    title='Pomoc'
                    classActive={systemState.currentApp === 'help'}
                    action={() => handleClick('help')}
                />

                <div className='py-3'></div>

                {
                    systemState.user.admin && <DockButton
                        icon={iconAdmin}
                        label='Administracja systemem'
                        title='Administracja'
                        classActive={systemState.currentApp === 'admin'}
                        action={() => handleClick('admin')}
                    />
                }

                <DockButton
                    icon={iconSettings}
                    label='Ustawienia'
                    title='Ustawienia'
                    classActive={systemState.currentApp === 'settings'}
                    action={() => handleClick('settings')}
                />

                <DockButton
                    icon={iconLogOut}
                    label='Wyloguj się z systemu'
                    title='Wyloguj się'
                    action={() => systemDispatch({ type: 'LOG_OUT' })}
                />

            </div>
        </div>
    </section>
}

export default Dock