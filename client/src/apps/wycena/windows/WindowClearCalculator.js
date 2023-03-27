import { useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'

const WindowClearCalculator = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appDispatch } = systemState.window.data

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-md-2'>
                Czy na pewno chcesz wyczyścić formularz kalkulatora?
            </h2>

            <p className='m-0'>
                Niezapisane zmiany zostaną utracone!
            </p>
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-12 d-flex justify-content-end">
            <button
                className="btn btn-sec ms-2"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>

            <button
                className="btn btn-prim ms-2"
                onClick={() => {
                    appDispatch({ type: 'RESET_CALCULATOR' })
                    systemDispatch({ type: 'CLOSE_WINDOW' })
                }}
            >
                Wyczyść formularz
            </button>
        </div>
    </div>
}

export default WindowClearCalculator