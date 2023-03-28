import { useLocation, useNavigate } from 'react-router-dom'

import iconUser from '../../../img/icon-user-settings.png'

const Menu = ({ apps }) => {
    const currentApp = useLocation().pathname.replace('/settings/', '')
    const navigation = useNavigate()

    return <div className="column-menu section-gray-l">
        <section className="section-gray">
            <h1 className="font-title fw-bold p-3 pe-5 mb-3">Ustawienia:</h1>
        </section>

        <button
            className={`btn btn-tr ${currentApp === 'user' ? 'btn-selected' : ''} btn-icon-text btn-full-width text-start px-3 py-2 mb-4`}
            onClick={() => navigation('/settings')}
        >
            <img src={iconUser} alt="" />
            Ustawienia użytkownika
        </button>

        {
            apps.map(app => <>
                {
                    app.id >= 0 && <button
                        className={`btn btn-tr ${app.slug === currentApp ? 'btn-selected' : ''} btn-icon-text btn-full-width text-start py-2 px-3`}
                        onClick={() => navigation('/settings/' + app.slug)}
                    >
                        <img src={`/img/icon-app-${app.slug}-black.png`} />

                        {app.name}
                    </button>
                }
            </>)
        }
    </div>
}

export default Menu