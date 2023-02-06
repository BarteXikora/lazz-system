const CheckBoxFilter = ({ checkboxes, update }) => {
    return <>
        <div className="d-block checkbox-container mt-1 mb-3 ms-1">
            <label>
                <b className={checkboxes.filter(box => box.checked).length === 0 ? 'font-wrong' : ''}>
                    Wszystkie
                </b>

                <input
                    type="checkbox"
                    checked={checkboxes.filter(box => !box.checked).length === 0}
                    onChange={() => update('all')}
                />

                <div className="checkmark"></div>
            </label>
        </div>

        {
            checkboxes.map(option => <div key={option.id} className="d-block checkbox-container mt-1 ms-1">
                <label>
                    {option.name}

                    <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => update(option.id)}
                    />

                    <div className="checkmark"></div>
                </label>
            </div>)
        }
    </>
}

export default CheckBoxFilter