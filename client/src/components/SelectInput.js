import { useState, useRef } from 'react'
import useClickOutside from '../functions/useClickOutside'

const SelectInput = ({ state, setState, options }) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false)

    const containerRef = useRef(null)
    useClickOutside(containerRef, () => setIsDropdownShown(false))

    return <div className="csi-container" ref={containerRef}>
        <div className="csi-selected" onClick={() => setIsDropdownShown(!isDropdownShown)}>
            <b>{state.name || <span className="font-gray">Wybierz opcję</span>}</b>
        </div>

        <div className={`csi-options-dropdown ${isDropdownShown ? '' : 'd-none'}`}>
            {
                options.map(opt => <div
                    key={opt.id}
                    className="csi-option"
                    onClick={() => { setState(opt); setIsDropdownShown(false) }}
                >
                    {opt.name}
                </div>)
            }
        </div>
    </div>
}

export default SelectInput