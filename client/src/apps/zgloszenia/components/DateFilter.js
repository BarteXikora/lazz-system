import { Collapse } from 'react-bootstrap'

const DateFilter = ({ currentOptions, update }) => {
    return <>
        <div className="d-block checkbox-container mt-1 ms-1">
            <label>
                Od początku

                <input
                    type="checkbox"
                    checked={currentOptions.fromStart}
                    onChange={() => update({ ...currentOptions, fromStart: !currentOptions.fromStart })}
                />

                <div className="checkmark"></div>
            </label>
        </div>

        <Collapse in={!currentOptions.fromStart}>
            <div className="px-1">
                <div className="mt-2 mb-4">
                    <input
                        type="date"
                        value={currentOptions.from}
                        onChange={(e) => update({ ...currentOptions, from: e.target.value })}
                    />
                </div>
            </div>
        </Collapse>

        <div className="d-block checkbox-container mt-1 ms-1">
            <label>
                Do końca

                <input
                    type="checkbox"
                    checked={currentOptions.toEnd}
                    onChange={() => update({ ...currentOptions, toEnd: !currentOptions.toEnd })}
                />

                <div className="checkmark"></div>
            </label>
        </div>

        <Collapse in={!currentOptions.toEnd}>
            <div className="px-1">
                <div className="mt-2 mb-4">
                    <input
                        type="date"
                        value={currentOptions.to}
                        onChange={(e) => update({ ...currentOptions, to: e.target.value })}
                    />
                </div>
            </div>
        </Collapse>
    </>
}

export default DateFilter