import UserInfo from './users-settings/UserInfo'
import ChangeData from './users-settings/ChangeData'

const UserSettings = () => {
    return <div className="row p-3 m-0">
        <UserInfo />

        <hr className='my-5' />

        <ChangeData />
    </div>
}

export default UserSettings