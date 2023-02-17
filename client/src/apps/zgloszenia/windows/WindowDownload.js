import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import WindowContext from '../../../functions/WindowContext'
import moment from 'moment'

import { exportListTXT, exportListJSON } from '../functions/exportList'

const WindowDownload = () => {
    const { systemState, systemDispatch } = useContext(WindowContext)
    const { appState } = systemState.window.data

    const navigate = useNavigate()

    const handleDownload = (type) => {
        let file, fileType = ''

        if (type === 'txt') {
            fileType = 'text/plain'
            file = exportListTXT(appState.filteredSortedList)

        } else if (type === 'json') {
            fileType = 'application/json'
            file = exportListJSON(appState.filteredSortedList)
        }

        if (file !== undefined) {
            let _a = document.createElement('a')
            _a.download = 'Lista kontaktów z ' + moment().format('DD-MM-YYYY')
            _a.href = URL.createObjectURL(file)
            _a.dataset.downloadurl = [fileType, _a.download, _a.href].join(':')
            _a.style.display = 'none'

            document.body.appendChild(_a)
            _a.click()
            document.body.removeChild(_a)
            setTimeout(() => { URL.revokeObjectURL(_a.href) }, 1500)
        }
    }

    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-2'>Pobierz listę kontaktów:</h2>

            <p className='m-0'>
                Więcej informacji na temat pobierania listy kontaktów znaleźć
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
            </p>
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-12 mb-2 d-flex flex-column flex-md-row justify-content-between">
            <div className='d-flex flex-column flex-md-row'>
                <button className='btn btn-prim mb-1 me-md-1' onClick={() => handleDownload('txt')}>
                    Pobierz listę .TXT do Excela
                </button>

                <button className='btn btn-prim mb-1 me-md-1' onClick={() => handleDownload('json')}>
                    Pobierz listę .JSON
                </button>
            </div>

            <button
                className='btn btn-sec mt-4 mt-md-0'
                onClick={() => systemDispatch({ type: 'CLOSE_WINDOW' })}
            >
                Anuluj
            </button>
        </div>
    </div>
}

export default WindowDownload