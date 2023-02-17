import { useState, useEffect, useContext } from 'react'
import WindowContext from '../../../functions/WindowContext'
import SelectInput from '../../../components/SelectInput'

const WindowSort = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appState, appDispatch } = systemState.window.data

    const options = [
        { id: 'date', name: 'Data', asc: 'od najnowszych do najstarszych', desc: 'od najstarszych do najnowszych' },
        { id: 'client', name: 'Klient', asc: 'alfabetycznie A - Z', desc: 'alfabetycznie Z - A' },
        { id: 'department', name: 'Dział', asc: 'alfabetycznie A - Z', desc: 'alfabetycznie Z - A' },
        { id: 'worker', name: 'Przekazano', asc: 'alfabetycznie A - Z', desc: 'alfabetycznie Z - A' },
        { id: 'star', name: 'Gwiazdka', asc: 'najpierw oznaczone', desc: 'najpierw nieoznaczone' }
    ]

    const getOption = (id) => {
        return options.filter(o => o.id === id)[0] || false
    }

    const [currentSort] = useState(getOption(appState.sort.by).name || '[ błąd ]')
    const [currentMethod] = useState(getOption(appState.sort.by)[appState.sort.method] || '')

    const [newSort, setNewSort] = useState(getOption(appState.sort.by) || {})
    const [newMethod, setNewMethod] = useState(appState.sort.method || 'asc')

    const handleSetSort = () => {
        appDispatch({ type: 'SORT_CONTACTS', payload: { by: newSort.id, method: newMethod } })
        systemDispatch({ type: 'CLOSE_WINDOW' })
    }

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-big fw-bold m-0'>Aktualne sortowanie:</h2>

            <p className="font-default">
                Wedłóg pola <b>{currentSort}</b> {currentMethod}.
            </p>

            <hr className='mb-4' />

            <SelectInput options={options} state={newSort} setState={setNewSort} />

            <div className='mt-3'>
                <div className="checkbox-container radio mt-3 ms-1">
                    <label className='d-block mb-2'>
                        <span>{getOption(newSort.id).asc}</span>

                        <input
                            type="checkbox"
                            checked={newMethod === 'asc'}
                            onChange={() => setNewMethod('asc')}
                        />

                        <div className="checkmark"></div>
                    </label>

                    <label className='d-block mb-2'>
                        <span>{getOption(newSort.id).desc}</span>

                        <input
                            type="checkbox"
                            checked={newMethod === 'desc'}
                            onChange={() => setNewMethod('desc')}
                        />

                        <div className="checkmark"></div>
                    </label>
                </div>
            </div>

            <hr className='mt-5 pt-4 mb-2' />

            <button
                className="btn btn-prim btn-full-width mb-2"
                onClick={handleSetSort}
            >
                Zastosuj
            </button>

            <button
                className="btn btn-sec btn-full-width"
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>
        </div>
    </div>
}

export default WindowSort