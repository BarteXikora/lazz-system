import { useState, useEffect } from 'react'
import { Collapse } from 'react-bootstrap'

const DateFilter = ({ currentOptions, update }) => {
    const [current, setCurrent] = useState(currentOptions)

    useEffect(() => update(current), [current])

    return <>
        <div className="d-block checkbox-container mt-1 ms-1">
            <label>
                Od początku

                <input
                    type="checkbox"
                    checked={current.fromStart}
                    onChange={() => setCurrent({ ...current, fromStart: !current.fromStart })}
                />

                <div className="checkmark"></div>
            </label>
        </div>

        <Collapse in={!current.fromStart}>
            <div className="px-1">
                <div className="mt-2 mb-4">
                    <input
                        type="date"
                        value={current.from}
                        onChange={(e) => setCurrent({ ...current, from: e.target.value })}
                    />
                </div>
            </div>
        </Collapse>

        <div className="d-block checkbox-container mt-1 ms-1">
            <label>
                Do końca

                <input
                    type="checkbox"
                    checked={current.toEnd}
                    onChange={() => setCurrent({ ...current, toEnd: !current.toEnd })}
                />

                <div className="checkmark"></div>
            </label>
        </div>

        <Collapse in={!current.toEnd}>
            <div className="px-1">
                <div className="mt-2 mb-4">
                    <input
                        type="date"
                        value={current.to}
                        onChange={(e) => setCurrent({ ...current, to: e.target.value })}
                    />
                </div>
            </div>
        </Collapse>
    </>
}

export default DateFilter