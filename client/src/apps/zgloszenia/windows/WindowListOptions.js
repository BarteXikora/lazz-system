import { useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'

import iconDownload from '../img/icon-download.png'
import iconReload from '../img/icon-reload.png'
import iconAdd from '../img/icon-add.png'
import iconSort from '../img/icon-sort.png'

const WindowListOptions = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appState, appDispatch, openWindow, fetchList } = systemState.window.data

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-4'>Operacje na liście:</h2>

            <hr className='mb-4' />

            <button
                className={`btn ${appState.privilages.add ? 'btn-prim' : 'btn-dis'} btn-icon-text btn-full-width mb-3`}
                onClick={
                    appState.privilages.add ?
                        () => openWindow('add', { openWindow, reload: fetchList })
                        :
                        () => openWindow('privilages', {})
                }
            >
                <img src={iconAdd} alt="Dodaj" />
                <span>Dodaj kontakt</span>
            </button>

            <hr className='mb-4' />

            <button
                className="btn btn-sec btn-icon-text btn-full-width mb-2 me-2"
                onClick={() => { fetchList(); systemDispatch({ type: 'CLOSE_WINDOW' }) }}
            >
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>

            <button
                className={`btn ${appState.privilages.download ? 'btn-sec' : 'btn-dis'} btn-icon-text btn-full-width mb-2 me-2`}
                onClick={
                    appState.privilages.download ?
                        () => openWindow('download', { appState, appDispatch })
                        :
                        () => openWindow('privilages', {})
                }
            >
                <img src={iconDownload} alt="Pobierz..." />
                <span>Pobierz...</span>
            </button>

            <button
                className="btn btn-sec btn-icon-text btn-full-width mb-2 me-2"
                onClick={() => openWindow('sort', { appState, appDispatch })}
            >
                <img src={iconSort} alt="Sortuj..." />
                <span>Sortuj...</span>
            </button>

            <hr className='mb-4' />

            <button
                className="btn btn-sec btn-full-width"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>
        </div>
    </div>
}

export default WindowListOptions