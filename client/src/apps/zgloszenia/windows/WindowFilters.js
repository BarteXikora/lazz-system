import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowContext from '../../../functions/WindowContext'
import CheckBoxFilter from '../components/CheckBoxFilter'
import DateFilter from '../components/DateFilter'

import clearFilters from '../functions/clearFilters'
import iconDelete from '../img/icon-delete.png'

const WindowFilters = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appState, appDispatch } = systemState.window.data

    const navigate = useNavigate()

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>Filtry zgłoszeń:</h2>

            <p className='m-0'>
                Filtry pomagają w szybszym odnalezieniu rządanych zgłoszeń.
                <br />
                <b>
                    Więcej informacji na temat filtrowania zgłoszeń znaleźć
                    można w <button
                        className='fake-link link-help fw-bold'
                        onClick={() => {
                            systemDispatch({ type: 'CLOSE_WINDOW' })
                            systemDispatch({ type: 'SELECT_APP', payload: 'help' })
                            navigate('/help/zgloszenia')
                        }}
                    >
                        centrum pomocy.
                    </button>
                </b>
            </p>
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-4">
            <h3 className='font-big fw-bold mb-3'>Formularz kontaktowy:</h3>

            <CheckBoxFilter
                allOptions={appState.formsList}
                currentOptions={appState.currentFilters.form}
                update={values => appDispatch({
                    type: 'UPDATE_FILTERS',
                    payload: { filter: 'form', values }
                })}
            />
        </div>

        <div className="col-4">
            <h3 className='font-big fw-bold mb-3'>Dział:</h3>

            <CheckBoxFilter
                allOptions={appState.departmentsList}
                currentOptions={appState.currentFilters.department}
                update={values => appDispatch({
                    type: 'UPDATE_FILTERS',
                    payload: { filter: 'department', values }
                })}
            />
        </div>

        <div className="col-4">
            <h3 className='font-big fw-bold mb-3'>Data zgłoszenia:</h3>

            <DateFilter
                currentOptions={appState.currentFilters.date}
                update={values => appDispatch({
                    type: 'UPDATE_FILTERS',
                    payload: { filter: 'date', values }
                })}
            />
        </div>

        <div className="col-12 mt-4"><hr /></div>

        <div className="col-12 mt-2 d-flex justify-content-between">
            <div>
                <button
                    className="btn btn-dis me-2 mb-1"
                    title='Tak funkcja nie jest jeszcze gotowa!'
                    onClick={null}
                >
                    Przywróć filtry domyślne
                </button>

                <button
                    className="btn btn-x btn-icon-text me-2 mb-1"
                    onClick={() => appDispatch({ type: 'SET_FILTERS', payload: clearFilters })}
                >
                    <img src={iconDelete} alt="Wyczyść filtry" />

                    <span>Wyczyść filtry</span>
                </button>
            </div>

            <button
                className="btn btn-prim ms-2 mb-1"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                OK
            </button>
        </div>
    </div>
}

export default WindowFilters