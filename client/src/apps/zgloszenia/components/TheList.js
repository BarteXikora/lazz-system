import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import ListSortPanel from './ListSortPanel'
import ListSearchInfo from './ListSearchInfo'
import ListItem from './ListItem'
import ListEmpty from './ListEmpty'

const TheList = () => {
    const { appState, appDispatch, waitSetStars } = useContext(AppContext)

    return <>
        {
            appState.currentFilters.search !== '' && <ListSearchInfo
                phrase={appState.currentFilters.search}
                action={() => appDispatch({ type: 'UPDATE_FILTERS', payload: { search: '' } })}
            />
        }

        {
            appState.filteredSortedList.length === 0 ? <ListEmpty /> : <>

                <ListSortPanel />

                <main className="container-fluid mt-3 mb-5 px-3 px-md-4">
                    {
                        appState.filteredSortedList.map(contact => <ListItem
                            key={contact.id}
                            contact={contact}
                            isActive={contact.id === appState.selectedContact}
                            select={(id) => {
                                appDispatch({ type: 'SELECT_CONTACT', payload: id });
                                appDispatch({ type: 'OPEN_CLOSE_PREVIEW', payload: true })
                            }}
                            setStar={waitSetStars}
                        />)
                    }
                </main>

                <div className="my-5 py-5 my-md-0 py-md-0"></div>
            </>
        }
    </>
}

export default TheList