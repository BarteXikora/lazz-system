import { useEffect, useContext, useReducer } from 'react'
import SystemContext from '../../functions/SystemContext'
import AppContext from './functions/AppContext'

import { LoadingBig } from '../../components/Loading'
import TopBar from './components/TopBar'
import ListHeader from './components/ListHeader'
import TheList from './components/TheList'
import ListError from './components/ListError'
import ListEmpty from './components/ListEmpty'
import PreviewWrong from './components/PreviewWrong'
import ThePreview from './components/ThePreview'

import appReducer from './functions/appReducer'
import defaultAppState from './functions/defaultAppState'
import windowsSlugs from './functions/windowsSlugs'

import { APIget } from '../../functions/api'

const App = () => {
    const { systemState, systemDispatch } = useContext(SystemContext)
    const [appState, appDispatch] = useReducer(appReducer, defaultAppState)

    const fetchList = async () => {
        // Get forms list:
        const forms = await APIget(
            systemState.apiLink,
            '/zgloszenia/get-forms',
            { 'auth-token': systemState.user.authToken }
        )
        if (!forms.success) return appDispatch({
            type: 'LIST_ERROR', payload: {
                success: false,
                message: 'Nie udało się pobrać listy formularzy!',
                error: '@ZGLOSZENIA/get-departments#00'
            }
        })
        if (!forms.data.success) return appDispatch({ type: 'LIST_ERROR', payload: forms.data })
        appDispatch({ type: 'LOAD_FORMS', payload: forms.data.data })

        // Get departments list:
        const departments = await APIget(
            systemState.apiLink,
            '/zgloszenia/get-departments',
            { 'auth-token': systemState.user.authToken }
        )
        if (!departments.success) return appDispatch({
            type: 'LIST_ERROR', payload: {
                success: false,
                message: 'Nie udało się pobrać listy działów!',
                error: '@ZGLOSZENIA/get-departments#00'
            }
        })
        if (!departments.data.success) return appDispatch({ type: 'LIST_ERROR', payload: departments.data })
        appDispatch({ type: 'LOAD_DEPARTMENTS', payload: departments.data.data })

        // Get workers list:
        const workers = await APIget(
            systemState.apiLink,
            '/zgloszenia/get-workers',
            { 'auth-token': systemState.user.authToken }
        )
        if (!workers.success) return appDispatch({
            type: 'LIST_ERROR', payload: {
                success: false,
                message: 'Nie udało się pobrać listy pracowników!',
                error: '@ZGLOSZENIA/get-workers#00'
            }
        })
        if (!workers.data.success) return appDispatch({ type: 'LIST_ERROR', payload: workers.data })
        appDispatch({ type: 'LOAD_WORKERS', payload: workers.data.data })

        // Get stars:
        const stars = await APIget(
            systemState.apiLink,
            '/zgloszenia/get-stars',
            { 'auth-token': systemState.user.authToken }
        )
        if (!stars.success) return appDispatch({
            type: 'LIST_ERROR', payload: {
                success: false,
                message: 'Nie udało się pobrać listy gwiazdek!',
                error: '@ZGLOSZENIA/get-stars#00'
            }
        })
        if (!stars.data.success) return appDispatch({ type: 'LIST_ERROR', payload: stars.data })
        appDispatch({ type: 'LOAD_STARS', payload: stars.data.data })

        // Get contacts list:
        const contacts = await APIget(
            systemState.apiLink,
            '/zgloszenia/get-list',
            { 'auth-token': systemState.user.authToken }
        )
        if (!contacts.success) return appDispatch({
            type: 'LIST_ERROR', payload: {
                success: false,
                message: 'Nie udało się pobrać listy zgłoszeń!',
                error: '@ZGLOSZENIA/get-contacts#00'
            }
        })
        if (!contacts.data.success) return appDispatch({ type: 'LIST_ERROR', payload: contacts.data })
        appDispatch({ type: 'LOAD_CONTACTS', payload: contacts.data.data })
    }
    useEffect(() => { fetchList() }, [])

    const openWindow = (slug, data = {}) => {
        const { title, content } = windowsSlugs.find(slug)

        systemDispatch({
            type: 'OPEN_WINDOW',
            payload: { title, content, data }
        })
    }

    return <AppContext.Provider value={{ appState, appDispatch, openWindow }}>
        <TopBar />

        <div className="scroll-columns">
            <div className="scroll-column px-3" style={{ width: '60vw' }}>
                <ListHeader />

                {
                    !appState.listReady ?
                        <div className="mt-5 pt-5">
                            <LoadingBig />
                        </div>

                        :

                        appState.error.isError ?
                            <ListError message={appState.error.message} code={appState.error.code} />

                            :

                            appState.contactsList.length === 0 ?
                                <ListEmpty />

                                :

                                <TheList />
                }
            </div>

            <div className="scroll-column section-gray-l" style={{ width: '40vw' }}>
                {
                    !appState.listReady ?
                        <div className="mt-5 pt-5">
                            <LoadingBig />
                        </div>

                        :

                        appState.error.isError ?
                            <PreviewWrong />

                            :

                            appState.contactsList.length === 0 ?
                                <PreviewWrong />

                                :

                                <ThePreview />

                }
            </div>
        </div>
    </AppContext.Provider>
}

export default App