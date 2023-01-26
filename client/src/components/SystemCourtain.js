import { useRef } from 'react'

import useCssAnimate from '../functions/useCssAnimate'

const SystemCourtain = ({ shown, closeAll }) => {
    const courtainRef = useRef(null)
    useCssAnimate(shown, [{
        element: courtainRef.current,
        animations: [{
            on: true,
            steps: [{ addClass: ['fade-in'], remClass: ['d-none'] }]
        }, {
            on: false,
            steps: [
                { addClass: ['fade-out'] },
                { delay: 200, addClass: ['d-none'], remClass: ['fade-in', 'fade-out'] }
            ]
        }]
    }])

    return <div onClick={closeAll} ref={courtainRef} className="d-none page-courtain"></div>
}

export default SystemCourtain