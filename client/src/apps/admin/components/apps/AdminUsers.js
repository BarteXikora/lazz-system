import { useContext } from 'react'
import AppContext from '../../functions/AppContext'

import TitleBar from './admin-users/TitleBar'
import UsersList from './admin-users/UsersList'

const AdminUsers = () => {
    const { appState, openWindow } = useContext(AppContext)

    return <div className="row p-0 m-0">
        <TitleBar usersCnt={appState.usersList.length} openWindow={openWindow} />

        <UsersList users={appState.usersList} />
    </div>
}

export default AdminUsers