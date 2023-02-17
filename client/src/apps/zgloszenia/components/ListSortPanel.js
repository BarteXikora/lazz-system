import { useState, useEffect, useContext } from 'react'
import AppContext from '../functions/AppContext'

import ListSortSection from './ListSortSection'

const ListSortPanel = () => {
    const { appState, appDispatch } = useContext(AppContext)
    const [currentSort, setCurrentSort] = useState(appState.sort)
    useEffect(() => setCurrentSort(appState.sort), [appState.sort])

    const handleSortClick = (sort) => {
        let newSort = { by: sort, method: 'asc' }
        if (sort === currentSort.by) newSort.method = currentSort.method === 'desc' ? 'asc' : 'desc'

        appDispatch({ type: 'SORT_CONTACTS', payload: newSort })
    }

    return <section className="container-fluid sticky-top mt-4 px-3 px-md-4">
        <div className="row">
            <ListSortSection
                classes='section-gray-d col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2'
                text='Data:'
                isActive={currentSort.by === 'date'}
                isDesc={currentSort.by === 'date' && currentSort.method === 'desc'}
                action={() => handleSortClick('date')}
            />

            <ListSortSection
                classes='section-gray col-8 col-sm-4'
                text='Klient:'
                isActive={currentSort.by === 'client'}
                isDesc={currentSort.by === 'client' && currentSort.method === 'desc'}
                action={() => handleSortClick('client')}
            />

            <ListSortSection
                classes='section-gray-d col-2 d-none d-md-flex d-lg-none d-xl-flex'
                text='Dział:'
                isActive={currentSort.by === 'department'}
                isDesc={currentSort.by === 'department' && currentSort.method === 'desc'}
                action={() => handleSortClick('department')}
            />

            <ListSortSection
                classes='section-gray-d section-md-gray section-lg-gray-d section-xl-gray col-3 d-none d-sm-flex'
                text='Przekazano:'
                isActive={currentSort.by === 'worker'}
                isDesc={currentSort.by === 'worker' && currentSort.method === 'desc'}
                action={() => handleSortClick('worker')}
            />

            <ListSortSection
                classes='section-gray section-md-gray-d section-lg-gray section-xl-gray-d d-none d-sm-flex col-2 col-md-1 col-lg-2 col-xl-1'
                text='★'
                isActive={currentSort.by === 'star'}
                isDesc={currentSort.by === 'star' && currentSort.method === 'desc'}
                action={() => handleSortClick('star')}
            />
        </div>
    </section>
}

export default ListSortPanel