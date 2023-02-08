import iconDownload from '../img/icon-download.png'
import iconReload from '../img/icon-reload.png'
import iconAdd from '../img/icon-add.png'

const ListHeader = ({ shownCnt, allCnt }) => {
    return <header className="d-flex justify-content-between align-items-center mt-4">
        <h2 className="fw-bold font-subtitle m-0">
            <span>Zgłoszenia:</span>
            <span className="font-gray ms-2">({shownCnt === allCnt ? allCnt : `${shownCnt} z ${allCnt}`})</span>
        </h2>

        <div className='d-flex'>
            <button className="btn btn-sec btn-icon-text-small ms-2">
                <img src={iconDownload} alt="Pobierz..." />
                <span>Pobierz listę...</span>
            </button>

            <button className="btn btn-sec btn-icon-text-small ms-2">
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>

            <button className="btn btn-prim btn-icon-text-small ms-4">
                <img src={iconAdd} alt="Dodaj" />
                <span>Dodaj zgłoszenie</span>
            </button>
        </div>
    </header>
}

export default ListHeader