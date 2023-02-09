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

    return <section className="container-fluid sticky-top mt-4 px-3">
        <div className="row">
            <ListSortSection
                cols='2'
                text='Data:'
                isActive={currentSort.by === 'date'}
                isDesc={currentSort.by === 'date' && currentSort.method === 'desc'}
                isEven={true}
                action={() => handleSortClick('date')}
            />

            <ListSortSection
                cols='4'
                text='Klient:'
                isActive={currentSort.by === 'client'}
                isDesc={currentSort.by === 'client' && currentSort.method === 'desc'}
                isEven={false}
                action={() => handleSortClick('client')}
            />

            <ListSortSection
                cols='2'
                text='Dział:'
                isActive={currentSort.by === 'department'}
                isDesc={currentSort.by === 'department' && currentSort.method === 'desc'}
                isEven={true}
                action={() => handleSortClick('department')}
            />

            <ListSortSection
                cols='3'
                text='Przekazano:'
                isActive={currentSort.by === 'worker'}
                isDesc={currentSort.by === 'worker' && currentSort.method === 'desc'}
                isEven={false}
                action={() => handleSortClick('worker')}
            />

            <ListSortSection
                cols='1'
                text='★'
                isActive={currentSort.by === 'star'}
                isDesc={currentSort.by === 'star' && currentSort.method === 'desc'}
                isEven={true}
                action={() => handleSortClick('star')}
            />
        </div>
    </section>
}

export default ListSortPanel