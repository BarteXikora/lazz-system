import { useState, useEffect, useContext } from 'react'
import AppContext from '../functions/AppContext'

import ButtonLoading from '../../../components/ButtonLoading'

import iconDownload from '../img/icon-download.png'
import iconReload from '../img/icon-reload.png'
import iconAdd from '../img/icon-add.png'
import iconHamburger from '../../../img/icon-hamburger.png'

const ListHeader = ({ shownCnt, allCnt }) => {
    const { appState, appDispatch, openWindow, fetchList } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleReload = () => {
        if (isLoading) return

        setIsLoading(true)
        fetchList()
    }

    useEffect(() => setIsLoading(false), [appState.contactsList, appState.error])

    return <header
        className={`d-flex flex-row flex-lg-column flex-xl-row 
            justify-content-xl-between align-items-xl-center 
            justify-content-lg-start align-items-lg-start
            justify-content-between align-items-center
            mt-4 px-2 px-md-3`}
    >
        <h2 className="fw-bold font-subtitle m-0 mb-lg-3 mb-xl-0">
            <span className='me-2'>Zgłoszenia:</span>
            <span className="font-gray" style={{ whiteSpace: 'nowrap' }}>
                ({shownCnt === allCnt ? allCnt : `${shownCnt} z ${allCnt}`})
            </span>
        </h2>

        <div className='d-none d-md-flex'>
            <button
                className={`btn ${appState.privilages.download ? 'btn-sec' : 'btn-dis'} btn-icon-text-small ms-1`}
                title={appState.privilages.download ? '' : 'Brak uprawnień'}
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
                className="btn btn-sec btn-icon-text-small ms-1"
                onClick={handleReload}
            >
                {isLoading && <ButtonLoading />}

                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>

            <button
                className={`btn ${appState.privilages.add ? 'btn-prim' : 'btn-dis'} btn-icon-text-small ms-3`}
                title={appState.privilages.add ? '' : 'Brak uprawnień'}
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
        </div>

        <div className="d-flex d-md-none">
            <button
                className="btn btn-sec btn-icon"
                onClick={() => openWindow('list', { appState, appDispatch, openWindow, fetchList })}
            >
                <img src={iconHamburger} alt="Zobacz opcje listy" />
            </button>
        </div>
    </header>
}

export default ListHeader