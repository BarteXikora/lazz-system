import UsersListItem from './UsersListItem'

const UsersList = ({ users }) => {
    return <div className='col-12 my-4'>
        <h2 className='font-big fw-bold'>Lista użytkowników:</h2>

        {
            users.map(user => <UsersListItem
                key={user.id}
                user={user}
            />)
        }
    </div>
}

export default UsersList