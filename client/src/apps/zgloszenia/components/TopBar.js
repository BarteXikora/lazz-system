import { useState, useEffect, useContext } from 'react'
import AppContext from '../functions/AppContext'

import SearchBar from './SearchBar'

import clearFilters from '../functions/clearFilters'

import iconFilter from '../img/icon-filter.png'
import iconDelete from '../img/icon-delete.png'
import iconX from '../../../img/icon-close.png'

const TopBar = () => {
    const emptyPills = { search: '', form: false, department: false, date: false }

    const { appState, appDispatch, openWindow } = useContext(AppContext)

    const [filterPills, setFilterPills] = useState(emptyPills)

    useEffect(() => {
        let newPills = { ...emptyPills }

        if (appState.currentFilters.search.length > 0) {
            if (appState.currentFilters.search.length < 15) newPills.search = appState.currentFilters.search
            else newPills.search = appState.currentFilters.search.substring(0, 15) + '...'
        }

        if (appState.currentFilters.form.length > 0) newPills.form = true
        if (appState.currentFilters.department.length > 0) newPills.department = true

        let date = appState.currentFilters.date
        if (!date.fromStart || !date.toEnd) newPills.date = true

        setFilterPills(newPills)

    }, [appState.currentFilters])

    return <section className="section-gray py-2 px-3 d-flex justify-content-start align-items-center">
        <div style={{ width: '250px' }} className="me-3">
            <SearchBar />
        </div>

        <button
            className='btn btn-prim btn-icon-text-small'
            onClick={() => openWindow('filters', { appState, appDispatch })}
        >
            <img src={iconFilter} alt="Filtruj" />
            <span>Filtruj...</span>
        </button>

        {
            (filterPills.search || filterPills.form || filterPills.department || filterPills.date)
            && <button
                className="btn btn-icon-text-small btn-x ms-2"
                onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: clearFilters })}
            >
                <img src={iconDelete} alt="Wyczyść filtry" />

                <span>Wyczyść filtry</span>
            </button>
        }

        <div className="separator mx-3"></div>

        <div className="me-3 fw-bold font-gray-d d-flex align-items-center">
            {
                filterPills.search || filterPills.form || filterPills.department || filterPills.date ?

                    <>
                        <span className="font-big fw-bold me-4">Filtry:</span>

                        {
                            filterPills.search && <div className="filter-pill me-3">
                                <span>Fraza: <i className="phrase">{filterPills.search}</i></span>

                                <button
                                    className="btn btn-x btn-icon-small"
                                    onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: { search: '' } })}
                                >
                                    <img src={iconX} alt="Usuń filtr" />
                                </button>
                            </div>
                        }

                        {
                            filterPills.form && <div className="filter-pill me-3">
                                <span>Formularz...</span>

                                <button
                                    className="btn btn-x btn-icon-small"
                                    onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: { form: [] } })}
                                >
                                    <img src={iconX} alt="Usuń filtr" />
                                </button>
                            </div>
                        }

                        {
                            filterPills.department && <div className="filter-pill me-3">
                                <span>Dział...</span>

                                <button
                                    className="btn btn-x btn-icon-small"
                                    onClick={() => appDispatch({ type: 'UPDATE_FILTERS', payload: { department: [] } })}
                                >
                                    <img src={iconX} alt="Usuń filtr" />
                                </button>
                            </div>
                        }

                        {
                            filterPills.date && <div className="filter-pill me-3">
                                <span>Data...</span>

                                <button
                                    className="btn btn-x btn-icon-small"
                                    onClick={() => appDispatch({
                                        type: 'UPDATE_FILTERS',
                                        payload: { date: clearFilters.date }
                                    })}
                                >
                                    <img src={iconX} alt="Usuń filtr" />
                                </button>
                            </div>
                        }
                    </>

                    :

                    'Nie zastosowano żadnych filtrów...'
            }
        </div>
    </section>
}

export default TopBar