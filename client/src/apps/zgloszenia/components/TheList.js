import { useEffect, useContext } from 'react'
import AppContext from '../functions/AppContext'

import ListSortPanel from './ListSortPanel'
import ListItem from './ListItem'

const TheList = () => {
    const { appState, appDispatch } = useContext(AppContext)

    return <>
        <ListSortPanel />

        <main className="container-fluid mt-3 mb-5 px-3">
            {
                appState.contactsList.map(contact => <ListItem
                    key={contact.id}
                    contact={contact}
                    isActive={contact.id === appState.selectedContact}
                    select={(id) => appDispatch({ type: 'SELECT_CONTACT', payload: id })}
                />)
            }
        </main>
    </>
}

export default TheList