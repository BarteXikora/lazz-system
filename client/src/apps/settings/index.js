import { useContext } from 'react'
import SystemContext from '../../functions/SystemContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import UserSettings from './components/apps/UserSettings'
import AppSection from './components/AppSection'

const Index = () => {
    const { systemState } = useContext(SystemContext)

    return <Routes>
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
}

export default Index