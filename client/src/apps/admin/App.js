import { useContext } from 'react'
import SystemContext from '../../functions/SystemContext'
import { Routes, Route, Navigate } from 'react-router-dom'

import Menu from './components/Menu'
import AdminUsers from './components/apps/AdminUsers'
import AdminZgloszenia from './components/apps/AdminZgloszenia'

const App = () => {
    const { systemState } = useContext(SystemContext)

    return <div className='scroll-columns h-100'>
        <Menu />

        <div className="column-main">
            <Routes>
                <Route path='/' element={<Navigate to='user' />} />

                <Route path='user' element={<AdminUsers />} />
                <Route path='zgloszenia' element={<AdminZgloszenia />} />

                <Route path='*' element={<Navigate to='user' />} />
            </Routes>
        </div>
    </div>
}

export default App