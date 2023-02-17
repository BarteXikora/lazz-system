import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import picEmpty from '../../../img/pic-empty.png'
import iconReload from '../img/icon-reload.png'
import iconDelete from '../img/icon-delete.png'

import clearFilters from '../functions/clearFilters'

const ListEmpty = () => {
    const { appDispatch, fetchList } = useContext(AppContext)

    return <div className="mt-5 mt-sm-0 mt-md-5 pt-md-4 mb-5 px-2 px-md-3 text-center">
        <img src={picEmpty} alt="Wystąpił błąd!" className='d-none d-sm-inline' />

        <h2 className="fw-bold font-title font-gray-d mb-3">Lista zgłoszeń jest pusta!</h2>

        <p>
            Jeżeli lista powinna zawierać pozycje, skontaktuj<br />
            się z administratorem systemu!
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center mt-5">
            <button
                className="me-sm-2 mb-1 btn btn-x btn-icon-text"
                onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: clearFilters })}
            >
                <img src={iconDelete} alt="Odśwież" />
                <span>Wyczyść filtry</span>
            </button>

            <button className="btn mb-1 btn-prim btn-icon-text" onClick={fetchList}>
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>
        </div>

    </div>
}

export default ListEmpty