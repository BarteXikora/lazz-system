import UserInfo from './users-settings/UserInfo'
import ChangeData from './users-settings/ChangeData'
import ChangePassword from './users-settings/ChangePassword'
import DefaultApp from './users-settings/DefaultApp'

const UserSettings = () => {
    return <div className="row p-3 m-0">
        <UserInfo />

        <hr className='my-5' />

        {/* <ChangeData /> */}

        <ChangePassword />

        <DefaultApp />
    </div>
}

export default UserSettings