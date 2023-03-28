import { Navigate } from 'react-router-dom'

import ZgloszeniaSettings from './apps/ZgloszeniaSettings'
import WycenaSettings from './apps/WycenaSettings'

const AppSection = ({ slug }) => {
    if (slug === 'zgloszenia') return <ZgloszeniaSettings />

    if (slug === 'wycena') return <WycenaSettings />

    return <Navigate to='/settings' />
}

export default AppSection