import { useLocation, useNavigate } from 'react-router-dom'

const Menu = ({ apps }) => {
    const currentApp = useLocation().pathname.replace('/settings/', '')
    const navigation = useNavigate()

    return <div className="column-menu section-gray p-3">
        <h1 className="font-title fw-bold pe-5 mb-3">Ustawienia:</h1>

        <hr className="mt-0 p-0" />

        <button
            className={`btn btn-tr ${currentApp === 'user' ? 'btn-active' : ''} btn-full-width text-start mb-4`}
            onClick={() => navigation('/settings')}
        >
            Ustawienia użytkownika
        </button>

        <hr className="mt-0 p-0" />

        <h2 className="font-subtitle fw-bold">Ustawienia aplikacji: </h2>

        {
            apps.map(app => <>
                {
                    app.id >= 0 && <button
                        className={`btn btn-tr ${app.slug === currentApp ? 'btn-active' : ''} btn-full-width text-start`}
                        onClick={() => navigation('/settings/' + app.slug)}
                    >
                        {app.name}
                    </button>
                }
            </>)
        }
    </div>
}

export default Menu