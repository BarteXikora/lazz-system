const CheckBoxFilter = ({ allOptions, currentOptions, update }) => {
    return <>
        <div className="d-block checkbox-container mt-1 mb-3 ms-1">
            <label>
                <b>Wszystkie</b>

                <input
                    type="checkbox"
                />

                <div className="checkmark"></div>
            </label>
        </div>

        {
            allOptions.map(option => <div key={option.id} className="d-block checkbox-container mt-1 ms-1">
                <label>
                    {option.name}

                    <input
                        type="checkbox"
                    />

                    <div className="checkmark"></div>
                </label>
            </div>)
        }
    </>
}

export default CheckBoxFilter