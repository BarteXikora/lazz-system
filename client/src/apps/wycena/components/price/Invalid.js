import imgCheck from '../../../../img/pic-check.png'

const Invalid = () => {
    return <div className="section-gray px-3 py-4 d-flex align-items-center">
        <img src={imgCheck} className='me-3' width={110} alt="Sprawdź formularz kalkulacyjny!" />

        <div className='mt-3'>
            <h2 className="font-subtitle fw-bold m-0">Formularz nie jest uzupełniony prawidłowo!</h2>

            <p>
                Aby wykonać wycenę należy poprawić wszystkie pola wyszczególnione poniżej.
            </p>
        </div>
    </div>
}

export default Invalid