import { useContext } from 'react'
import AppContext from '../functions/AppContext'

import ListSortPanel from './ListSortPanel'
import ListItem from './ListItem'
import ListEmpty from './ListEmpty'

const TheList = () => {
    const { appState, appDispatch } = useContext(AppContext)

    return <>
        {
            appState.filteredSortedList.length === 0 ? <ListEmpty /> : <>

                <ListSortPanel />

                <main className="container-fluid mt-3 mb-5 px-3">
                    {
                        appState.filteredSortedList.map(contact => <ListItem
                            key={contact.id}
                            contact={contact}
                            isActive={contact.id === appState.selectedContact}
                            select={(id) => appDispatch({ type: 'SELECT_CONTACT', payload: id })}
                        />)
                    }
                </main>
            </>
        }
    </>
}

export default TheList