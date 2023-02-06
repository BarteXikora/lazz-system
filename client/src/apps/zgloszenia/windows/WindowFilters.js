import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowContext from '../../../functions/WindowContext'
import CheckBoxFilter from '../components/CheckBoxFilter'
import DateFilter from '../components/DateFilter'
import moment from 'moment'

const WindowFilters = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appState, appDispatch } = systemState.window.data

    const formsList = appState.formsList
    const departmentsList = appState.departmentsList
    const currentFilters = appState.currentFilters

    const prepareCheckboxes = (all, uncheched = []) => {
        return all.map(filter => {
            return {
                ...filter,
                checked: !uncheched.filter(current => current.id === filter.id).length > 0
            }
        })
    }

    const [formFilters, setFormFilters] = useState(prepareCheckboxes(formsList, currentFilters.form))
    const [departmentFilters, setDepartmentFilters]
        = useState(prepareCheckboxes(departmentsList, currentFilters.department))
    const [dateFilters, setDateFilters] = useState(currentFilters.date)
    const [isCorrect, setIsCorrect] = useState({ ok: true, clicked: false, message: '' })

    useEffect(() => {
        let answer = { ok: false, clicked: false, message: '' }

        if (formFilters.filter(f => f.checked).length === 0)
            answer.message = 'Nie zaznaczono żadnego formularza'

        else if (departmentFilters.filter(f => f.checked).length === 0)
            answer.message = 'Nie zaznaczono żadnego działu'

        else if (!dateFilters.fromStart && isNaN(Date.parse(dateFilters.from)))
            answer.message = 'Początkowa data zakresu jest nieprawidłowa'

        else if (!dateFilters.toEnd && isNaN(Date.parse(dateFilters.to)))
            answer.message = 'Końcowa data zakresu jest nieprawidłowa'

        else if (!dateFilters.fromStart && !dateFilters.toEnd && moment(dateFilters.from) > moment(dateFilters.to))
            answer.message = 'Data początkowa musi być mniejsza, lub równa dacie końcowej'

        else answer.ok = true

        setIsCorrect(answer)

    }, [formFilters, departmentFilters, dateFilters, systemState.window.isOpen])

    const handleCheckboxClick = (filter, checkbox) => {
        let current = { filter: undefined, setFilter: undefined }
        if (filter === 'form') current = { filter: formFilters, setFilter: setFormFilters }
        else if (filter === 'department') current = { filter: departmentFilters, setFilter: setDepartmentFilters }

        if (checkbox === 'all') {
            const setTo = current.filter.filter(box => !box.checked).length !== 0

            current.setFilter(current.filter.map(box => { return { ...box, checked: setTo } }))
            return
        }

        current.setFilter(current.filter.map(f => {
            if (f.id === checkbox) return { ...f, checked: !f.checked }
            return { ...f }
        }))
    }

    const undoChanges = () => {
        setFormFilters(prepareCheckboxes(formsList, currentFilters.form))
        setDepartmentFilters(prepareCheckboxes(departmentsList, currentFilters.department))
        setDateFilters(currentFilters.date)
    }

    useEffect(undoChanges, [systemState.window.isOpen])

    const clearFilters = () => {
        setFormFilters(prepareCheckboxes(formsList, []))
        setDepartmentFilters(prepareCheckboxes(departmentsList, []))
        setDateFilters({ ...currentFilters.date, fromStart: true, toEnd: true })
    }

    const handleSetFilters = () => {
        if (!isCorrect.ok) {
            if (!isCorrect.clicked) setIsCorrect({ ...isCorrect, clicked: true })
            return
        }

        let formsToSet = formFilters.filter(f => !f.checked)
        formsToSet = formsToSet.map(f => { return { id: f.id, name: f.name } })

        let departmentsToSet = departmentFilters.filter(f => !f.checked)
        departmentsToSet = departmentsToSet.map(f => { return { id: f.id, name: f.name, email: f.email } })

        let filtersToSet = { ...currentFilters, form: formsToSet, department: departmentsToSet, date: dateFilters }

        appDispatch({ type: 'UPDATE_FILTERS', payload: filtersToSet })
        systemDispatch({ type: 'CLOSE_WINDOW' })
    }

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
                checkboxes={formFilters}
                update={(checkbox) => handleCheckboxClick('form', checkbox)}
            />
        </div>

        <div className="col-4">
            <h3 className='font-big fw-bold mb-3'>Dział:</h3>

            <CheckBoxFilter
                checkboxes={departmentFilters}
                update={(checkbox) => handleCheckboxClick('department', checkbox)}
            />
        </div>

        <div className="col-4">
            <h3 className='font-big fw-bold mb-3'>Data zgłoszenia:</h3>

            <DateFilter
                currentOptions={dateFilters}
                update={(data) => setDateFilters(data)}
            />
        </div>

        {
            (!isCorrect.ok && isCorrect.clicked) && <div className="col-12 mt-5 warning-box">
                <h3 className="fw-bold font-big mb-0">{isCorrect.message || 'Wystąpił błąd'}.</h3>

                <p className='mb-0'>
                    Aby zastosować filtry należy rozwiązać ten problem, lub {` `}
                    <button className="fake-link fw-bold" onClick={clearFilters}>wyczyścić filtry</button>.

                    Więcej informacji na temat filtrowania zgłoszeń znaleźć można
                    w <button
                        className='fake-link link-help fw-bold'
                        onClick={() => {
                            systemDispatch({ type: 'CLOSE_WINDOW' })
                            systemDispatch({ type: 'SELECT_APP', payload: 'help' })
                            navigate('/help/zgloszenia')
                        }}
                    >
                        centrum pomocy.
                    </button>
                </p>
            </div>
        }

        <div className="col-12 mt-4"><hr /></div>

        <div className="col-12 mt-2 d-flex justify-content-between">
            <div>
                <button
                    className="btn btn-x me-2 mb-1"
                    onClick={clearFilters}
                >
                    <span>Wyczyść filtry</span>
                </button>

                <button
                    className="btn btn-sec me-2 mb-1"
                    onClick={undoChanges}
                >
                    <span>Cofnij zmiany</span>
                </button>
            </div>

            <div>
                <button
                    className='btn btn-sec ms-2 mb-1'
                    onClick={() => {
                        undoChanges()
                        systemDispatch({ type: 'CLOSE_WINDOW' })
                    }}
                >
                    Anuluj
                </button>

                <button
                    className={`btn ${isCorrect.ok ? 'btn-prim' : 'btn-dis'} ms-2 mb-1`}
                    onClick={() => {
                        handleSetFilters()
                    }}
                >
                    Zastosuj
                </button>
            </div>
        </div>
    </div>
}

export default WindowFilters