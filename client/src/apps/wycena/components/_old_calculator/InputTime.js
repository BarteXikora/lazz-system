import { useState, useEffect, useRef } from 'react'

const InputTime = ({ value, setValue }) => {
    const [innerValue, setInnerValue] = useState({ h: 0, m: 0 })

    const inputRef = useRef(null)
    const hoursRef = useRef(null)
    const minutesRef = useRef(null)

    useEffect(() => {
        const setValue = parseFloat(value) || 0
        const hours = parseInt(setValue) || 0
        const minutes = setValue % 1 === 0 ? 0 : 5

        setInnerValue({ h: hours, m: minutes })

    }, [value])

    const handleHours = (v) => {
        const allowed = /^-?[0-9]{0,}$/

        if (allowed.test(v)) setInnerValue({ ...innerValue, h: v })
    }

    const handleComma = (key) => {
        if (key === '.' || key === ',') minutesRef.current.focus()
    }

    const handleMinutes = (v) => {
        const allowed = /^[0-9]{0,1}$/

        if (allowed.test(v)) setInnerValue({ ...innerValue, m: v })
        else if (allowed.test(v[v.length - 1])) setInnerValue({ ...innerValue, m: v[v.length - 1] })
    }

    const handleBackSpace = (key) => {
        if (!innerValue.m && key === 'Backspace') hoursRef.current.focus()
    }

    const handleEnter = (key) => {
        if (key === 'Enter') {
            hoursRef.current.blur()
            minutesRef.current.blur()
        }
    }

    const handleRightArrow = (key) => {
        if (key === 'ArrowRight')
            if (hoursRef.current.selectionStart === hoursRef.current.value.length)
                minutesRef.current.focus()
    }

    const handleLeftArrow = (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault()

            hoursRef.current.focus()
        }
    }

    const validate = () => {
        let changedAnyValue = false
        let newValues = { ...innerValue }

        if (newValues.m > 0 && newValues.m < 5) {
            changedAnyValue = true
            newValues.m = 5

        } else if (innerValue.m > 5) {
            changedAnyValue = true
            newValues.h = Number(newValues.h) + 1
            newValues.m = 0
        }

        setInnerValue({ h: newValues.h, m: newValues.m })
        setValue(Number(newValues.h) + (Number(newValues.m) / 10))

        if (changedAnyValue) {
            inputRef.current.classList.add('fake-input-validated')

            setTimeout(() => {
                inputRef.current.classList.remove('fake-input-validated')
            }, 1000);
        }
    }

    return <div ref={inputRef} className="fake-input">
        <input
            type='text'
            className='text-end pe-1'
            placeholder='0'
            value={innerValue.h || ''}
            onChange={(e) => handleHours(e.target.value)}
            onKeyDown={(e) => { handleComma(e.key); handleEnter(e.key); handleRightArrow(e.key) }}
            onBlur={validate}
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
            onKeyDown={(e) => { handleBackSpace(e.key); handleEnter(e.key); handleLeftArrow(e) }}
            onBlur={validate}
            ref={minutesRef}
        />

        <div className="input-unit input-unit-end" title='Jednostka: godziny'>Godz.</div>
    </div>

}

export default InputTime