import { useState, useEffect, useContext } from 'react'
import SystemContext from '../../../../../functions/SystemContext'
import SelectInput from '../../../../../components/SelectInput'
import ButtonLoading from '../../../../../components/ButtonLoading'
import { APIpost } from '../../../../../functions/api'

import picSuccess from '../../../../../img/pic-success.png'

const DefaultApp = () => {
    const { systemState, systemDispatch } = useContext(SystemContext)

    const [selectedApp, setSelectedApp] = useState(systemState.defaultApp || { id: null })
    const [validate, setValidate] = useState({ ok: false, message: '', code: '', showInfo: false })
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (selectedApp.id === null) return setValidate({
            ok: false,
            message: 'Nie wybrano żadnej aplikacji.',
            code: '',
            showInfo: false
        })

        if (selectedApp.id === systemState.defaultApp.id) return setValidate({
            ok: false,
            message: 'Ta aplikacja jest aktualnie aplikacją domyślną.',
            code: '',
            showInfo: false
        })

        return setValidate({
            ok: true,
            message: '',
            code: '',
            showInfo: false
        })

    }, [selectedApp, systemState.defaultApp])

    const handleSubmit = async () => {
        if (isLoading) return

        if (!validate.ok) return setValidate({ ...validate, showInfo: true })

        setIsLoading(true)

        const answer = await APIpost(
            systemState.apiLink,
            '/system/users/change-default-app',
            { 'auth-token': systemState.user.authToken },
            { defaultAppID: selectedApp.id }
        )

        if (!answer.success) {
            setValidate({
                ok: false,
                message: 'Nie udało się zmienić aplikacji domyślnej.',
                code: '@SETTINGS/user-settings/change-default-app#00',
                showInfo: true
            })
            setIsLoading(false)

            return
        }

        if (!answer.data.success) {
            setValidate({
                ok: false,
                message: answer.data.data.message,
                code: answer.data.data.code,
                showInfo: true
            })
        }

        setIsLoading(false)
        setValidate({ ...validate, showInfo: false })
        systemDispatch({ type: 'UPDATE_DEFAULT_APP', payload: selectedApp })
        setShowSuccess(true)
    }

    return <div className="col-6">
        <h4 className="font-big fw-bold mb-3">Wybór aplikacji domyślnej:</h4>

        <div className="row m-0 px-1">
            <div className="col-10 p-0 pe-2">
                {
                    !showSuccess ?

                        systemState.appsList.filter(app => app.id >= 0).length > 1 ?

                            <>
                                <p>
                                    Aplikacja domyślna to aplikacja, która uruchomi się automatycznie po zalogowaniu,
                                    pod warunkiem, że użytkownik nie użyje bezpośredniego linku do innej
                                    aplikacji.
                                </p>

                                <SelectInput
                                    options={systemState.appsList.filter(app => app.id >= 0)}
                                    state={selectedApp}
                                    setState={app => { if (!isLoading) setSelectedApp(app) }}
                                />

                                {
                                    validate.showInfo && <div className="warning-box mt-4">
                                        <h5 className="font-big font-wrong fw-bold m-0">
                                            {validate.message}
                                        </h5>

                                        {
                                            validate.code && <span className="d-block font-gray fw-bold">
                                                Kod błędu: {validate.code}
                                            </span>
                                        }
                                    </div>
                                }

                                <button
                                    className={`btn ${validate.ok ? 'btn-prim' : 'btn-dis'} mt-4`}
                                    onClick={handleSubmit}
                                >
                                    {isLoading && <ButtonLoading />}

                                    Zapisz
                                </button>
                            </>

                            :


                            systemState.appsList.filter(app => app.id >= 0).length === 1 ?

                                <div className="info-box w-100 p-4">
                                    <h5 className="font-big fw-bold m-0">
                                        Masz dostęp do jednej palikacji: {' '}
                                        {systemState.appsList.filter(app => app.id >= 0)[0].name}.
                                    </h5>

                                    <p className='m-0'>
                                        Aplikacja ta będzie zawsze uruchamiana automatycznie po zalogowaniu.
                                    </p>
                                </div>

                                :

                                <div className="warning-box w-100 p-4">
                                    <h5 className="font-big fw-bold m-0">
                                        Nie posiadasz dostępu do żadnej aplikacji.
                                    </h5>

                                    <p className='m-0'>
                                        Aby otrzymać dostep do aplikacji skontaktuj się z administratorem.
                                    </p>
                                </div>

                        :

                        <div className='w-100 d-flex align-items-center section-gray-l'>
                            <img src={picSuccess} />

                            <div className="mx-3 py-4 mt-1">
                                <h4 className="font-subtitle fw-bold">
                                    Zapisano &bdquo;{selectedApp.name}&rdquo; jako aplikację domyślną!
                                </h4>

                                <p>
                                    Od teraz po zalogowaniu aplikacja ta będzie uruchamiana
                                    automatycznie.
                                </p>

                                <button
                                    className="btn btn-sec"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    Wróć do formularza
                                </button>
                            </div>
                        </div>

                }
            </div>
        </div>
    </div>
}

export default DefaultApp