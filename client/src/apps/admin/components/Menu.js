import { useLocation, useNavigate } from 'react-router-dom'

import iconUser from '../../../img/icon-user-settings.png'

const Menu = () => {
    const currentApp = useLocation().pathname.replace('/admin/', '')
    const navigation = useNavigate()

    return <div className="column-menu section-gray-l">
        <section className="section-gray">
            <h1 className="font-title fw-bold p-3 pe-5 mb-3">Administracja:</h1>
        </section>

        <button
            className={`btn btn-tr ${currentApp === 'user' ? 'btn-selected' : ''} btn-icon-text btn-full-width text-start px-3 py-2 mb-4`}
            onClick={() => navigation('/admin/user')}
        >
            <img src={iconUser} alt="" />
            Użytkownicy
        </button>

        <button
            className={`btn btn-tr ${currentApp === 'zgloszenia' ? 'btn-selected' : ''} btn-icon-text btn-full-width text-start px-3 py-2`}
            onClick={() => navigation('/admin/zgloszenia')}
        >
            <img src={'/img/icon-app-zgloszenia-black.png'} />
            Zgłoszenia
        </button>
    </div>
}

export default Menu