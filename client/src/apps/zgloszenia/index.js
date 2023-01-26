import { Routes, Route, Navigate } from 'react-router-dom'
import App from './App'

const Index = () => {
    return <Routes>
        <Route index element={<App />} />
        <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
}

export default Index