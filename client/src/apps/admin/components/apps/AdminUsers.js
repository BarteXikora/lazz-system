import TitleBar from './admin-users/TitleBar'
import UsersList from './admin-users/UsersList'

const AdminUsers = () => {
    return <div className="row p-0 m-0">
        <TitleBar />

        <UsersList />
    </div>
}

export default AdminUsers