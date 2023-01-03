import { useEffect, useRef } from 'react'

import useCssAnimate from '../functions/useCssAnimate'

const AppCourtain = ({ shown, closeAll }) => {
    const courtainRef = useRef(null)

    useCssAnimate(shown, [{
        element: courtainRef.current,
        onTrue: [{ addClass: ['fade-in'], removeClass: ['d-none'] }],
        onFalse: [
            { addClass: ['fade-out'] },
            { delay: 200, addClass: ['d-none'], removeClass: ['fade-in', 'fade-out'] }
        ]
    }])

    return <div onClick={closeAll} ref={courtainRef} className="d-none page-courtain"></div>
}

export default AppCourtain