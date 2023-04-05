import iconAddUser from '../../../../../img/icon-user-add.png'

const TitleBar = ({ usersCnt, openWindow, privilagesList }) => {
    return <div className='sticky-top col-12 section-gray d-flex align-items-center justify-content-between p-3'>
        <h1 className="font-big fw-bold m-0">
            Użytkownicy systemu: {' '}
            <span className="font-gray-d">({usersCnt})</span>
        </h1>

        <button
            className="btn btn-prim btn-icon-text"
            onClick={() => openWindow('registerUser', { privilagesList })}
        >
            <img src={iconAddUser} />

            Dodaj konto użytkownika
        </button>
    </div>
}

export default TitleBar