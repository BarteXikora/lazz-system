import { useContext } from 'react'
import SystemContext from '../../../../../functions/SystemContext'

import picUser from '../../../../../img/pic-user.png'

const UserInfo = () => {
    const { systemState } = useContext(SystemContext)

    return <>
        <div className="col-6 d-flex align-items-center section-gray-l p-0">
            <img src={picUser} className='section-gradient p-2' width={150} />

            <div className='ps-4'>
                <span>Zalogowany jako:</span>

                <h2 className="title fw-bold mb-0">{systemState.user.name}</h2>

                {
                    systemState.user.admin && <div className="fw-bold">(Administrator systemu)</div>
                }

                <div className='mt-2'>
                    Adres e-mail: {' '}
                    <a href={`mailto:${systemState.user.email}`}>{systemState.user.email}</a>
                </div>
            </div>
        </div>

        <div className="col-6"></div>
    </>
}

export default UserInfo