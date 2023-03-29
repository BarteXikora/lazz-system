import { useState, useContext } from 'react'
import SystemContext from '../../../../../functions/SystemContext'
import SelectInput from '../../../../../components/SelectInput'

const DefaultApp = () => {
    const { systemState } = useContext(SystemContext)

    const [selectedApp, setSelectedApp] = useState(systemState.defaultApp || { id: null })

    return <div className="col-6">
        <h4 className="font-big fw-bold mb-3">Wybór aplikacji domyślnej:</h4>

        <div className="row m-0 px-1">
            <div className="col-10 p-0 pe-2">
                <p>
                    Aplikacja domyślna to aplikacja, która uruchomi się automatycznie po zalogowaniu,
                    pod warunkiem, że użytkownik nie użyje bezpośredniego linku do innej
                    aplikacji.
                </p>

                <SelectInput
                    options={systemState.appsList.filter(app => app.id >= 0)}
                    state={selectedApp}
                    setState={app => setSelectedApp(app)}
                />

                <button className="btn btn-prim mt-4">Zapisz</button>
            </div>
        </div>
    </div>
}

export default DefaultApp