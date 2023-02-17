import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import iconDownload from '../img/icon-download.png'
import iconReload from '../img/icon-reload.png'
import iconAdd from '../img/icon-add.png'
import iconHamburger from '../../../img/icon-hamburger.png'

const ListHeader = ({ shownCnt, allCnt }) => {
    const { appState, appDispatch, openWindow, fetchList } = useContext(AppContext)

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
                className="btn btn-sec btn-icon-text-small ms-1"
                onClick={() => openWindow('download', { appState, appDispatch })}
            >
                <img src={iconDownload} alt="Pobierz..." />
                <span>Pobierz...</span>
            </button>

            <button
                className="btn btn-sec btn-icon-text-small ms-1"
                onClick={fetchList}
            >
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>

            <button
                className="btn btn-prim btn-icon-text-small ms-3"
                onClick={() => openWindow('add', { openWindow, reload: fetchList })}
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