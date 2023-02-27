import { useState, useEffect, useRef } from 'react'

const InputTime = ({ value, setValue }) => {
    const [innerValue, setInnerValue] = useState({ h: 0, m: 0 })

    const hoursRef = useRef(null)
    const minutesRef = useRef(null)

    useEffect(() => {
        const setValue = parseFloat(value) || 0
        const hours = parseInt(setValue) || 0
        const minutes = setValue % 1 > 0 ? 5 : 0

        setInnerValue({ h: hours, m: minutes })

    }, [value])

    const handleHours = (v) => {
        setValue(parseFloat(v) + parseFloat(innerValue.m / 10))
    }

    const handleComma = (key) => {
        if (key === '.' || key === ',') minutesRef.current.focus()
    }

    const handleMinutes = (v) => {
        const allowed = /^[0-9]{0,1}$/
        const vNumber = Number(v) || 0

        if (allowed.test(v)) {
            if (vNumber === 0) setValue(Number(innerValue.h))
            else if (vNumber <= 5) setValue(Number(innerValue.h) + 0.5)
            else setValue(Number(innerValue.h) + 1)

        } else if (v[v.length - 1] === '0') {
            setValue(Number(innerValue.h))
        }
    }

    const handleBackSpace = (key) => {
        if (innerValue.m === 0 && key === 'Backspace') hoursRef.current.focus()
    }

    return <>
        <div className="fake-input">
            <input
                type="number"
                className='text-end pe-1'
                placeholder='0'
                value={innerValue.h || ''}
                onChange={(e) => handleHours(e.target.value)}
                onKeyDown={(e) => handleComma(e.key)}
                ref={hoursRef}
            />

            <div className="fake-input-text">,</div>

            <input
                type="text"
                className='px-1'
                style={{ width: '20px' }}
                placeholder='0'
                value={innerValue.m || ''}
                onChange={(e) => handleMinutes(e.target.value)}
                onKeyDown={(e) => handleBackSpace(e.key)}
                ref={minutesRef}
            />

            <div className="input-unit input-unit-end">Godz.</div>
        </div>
    </>
}

export default InputTime