import { useContext } from 'react'
import SystemContext from '../../functions/SystemContext'
import { Routes, Route, Navigate } from 'react-router-dom'

const Index = () => {
    const { systemState } = useContext(SystemContext)

    return <Routes>
        <Route path='/' element={<Navigate to='user' />} />

        <Route path='user' element={'user settings'} />

        {
            systemState.appsList.map((app, n) => <Route
                key={n}
                path={app.slug}
                element={`${app.name} settings`}
            />)
        }

        <Route path='*' element={<Navigate to='user' />} />
    </Routes>
}

export default Index