import { useEffect, useContext, useRef } from 'react'
import SystemContext from '../functions/SystemContext'
import useCssAnimate from '../functions/useCssAnimate'

import WindowContext from '../functions/WindowContext'

import iconClose from '../img/icon-close.png'

const Window = () => {
    const { systemState, systemDispatch } = useContext(SystemContext)

    const containerRef = useRef(null)
    const windowRef = useRef(null)
    const scrollRef = useRef(null)
    useCssAnimate(systemState.window.isOpen, [{
        element: containerRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['fade-in'], remClass: ['d-none'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['fade-out'] },
                { delay: 200, addClass: ['d-none'], remClass: ['fade-in', 'fade-out'] }
            ]
        }]
    }, {
        element: windowRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['window-slide-in'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['window-slide-out'] },
                { delay: 200, remClass: ['window-slide-in', 'window-slide-out'] }
            ]
        }]
    }])

    useEffect(() => scrollRef.current.scroll({ top: 0 }), [systemState.window])

    return <WindowContext.Provider value={{ systemState, systemDispatch }}>
        <div className="d-none window-container" ref={containerRef}>
            <div className="window" ref={windowRef}>
                <div className="bar d-flex align-items-center justify-content-between">
                    <div className="window-title">
                        <span className="px-3">{systemState.window.title}</span>
                    </div>

                    <button className="btn btn-x btn-icon">
                        <img src={iconClose} alt="Zamknij okno" onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })} />
                    </button>
                </div>

                <div className="window-body py-4 px-2 px-md-4 m-0" ref={scrollRef}>
                    {systemState.window.content}
                </div>
            </div>
        </div>
    </WindowContext.Provider>
}

export default Window