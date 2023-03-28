import { useContext } from 'react'
import SystemContext from '../../functions/SystemContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import Menu from './components/Menu'
import UserSettings from './components/apps/UserSettings'
import AppSection from './components/AppSection'

const App = () => {
    const { systemState } = useContext(SystemContext)

    return <div className='scroll-columns h-100'>
        <Menu apps={systemState.appsList} />

        <div className="column-main">
            <Routes>
                <Route path='/' element={<Navigate to='user' />} />

                <Route path='user' element={<UserSettings />} />

                {
                    systemState.appsList.map((app, n) => <Route
                        key={n}
                        path={app.slug}
                        element={<AppSection slug={app.slug} />}
                    />)
                }

                <Route path='*' element={<Navigate to='user' />} />
            </Routes>
        </div>
    </div>
}

export default App