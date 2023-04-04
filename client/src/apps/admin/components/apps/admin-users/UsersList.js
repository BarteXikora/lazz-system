const UsersList = () => {
    return <div className='col-12 my-4'>
        <h2 className='font-big fw-bold'>Lista użytkowników:</h2>

        <div className="list-item px-2 mb-1 px-4 py-3 fw-bold">
            <span className='me-2'>Bartłomiej Sikora</span>

            <span className="font-sec">{' '}(Ty)</span>

            <span className="font-prim">{' '}(Administrator systemu)</span>

            <span className="font-wrong">{' '}(Brak dostępu do jakielkowiek aplikacji)</span>
        </div>
    </div>
}

export default UsersList