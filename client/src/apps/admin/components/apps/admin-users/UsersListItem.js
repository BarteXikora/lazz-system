import { useContext } from 'react'
import AppContext from '../../../functions/AppContext'

const UsersListItem = ({ user }) => {
    const { currentUser } = useContext(AppContext)

    return <div className="list-item px-2 mb-1 px-4 py-3 fw-bold">
        <span className='me-2'>{user.name}</span>

        {
            user.id === currentUser.id && <span className="font-sec">{' '}(Ty)</span>
        }

        {
            user.isAdmin && <span className="font-prim">{' '}(Administrator systemu)</span>
        }

        {
            !user.isAdmin && user.appsAccess && user.appsAccess.length === 0 && <span className="font-wrong">{' '}(Brak dostępu do jakielkowiek aplikacji)</span>
        }
    </div>
}

export default UsersListItem