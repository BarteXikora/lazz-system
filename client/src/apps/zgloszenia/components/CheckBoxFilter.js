import { useState } from 'react'

const CheckBoxFilter = ({ allOptions, currentOptions, update }) => {
    const prepareOptions = () => {
        return allOptions.map(opt => {
            return { ...opt, checked: !currentOptions.filter(cur => cur.id === opt.id).length > 0 }
        })
    }

    const [checkBoxes, setCheckBoxes] = useState(prepareOptions())

    const handleChange = (id) => {
        const newValues = checkBoxes.map(box => {
            if (box.id === id) return { ...box, checked: !box.checked }
            return { ...box }
        })

        setCheckBoxes(newValues)

        let valuesToUpdate = []
        newValues.map(val => {
            if (!val.checked) valuesToUpdate.push({ id: val.id, name: val.name })
        })

        update(valuesToUpdate)
    }

    const handleSelectAll = () => {
        if (checkBoxes.filter(box => box.checked === false).length > 0) {
            setCheckBoxes(checkBoxes.map(box => { return { ...box, checked: true } }))
            update([])

        } else {
            setCheckBoxes(checkBoxes.map(box => { return { ...box, checked: false } }))

            let valuesToUpdate = []
            checkBoxes.map(val => {
                valuesToUpdate.push({ id: val.id, name: val.name })
            })

            update(valuesToUpdate)
        }
    }

    return <>
        <div className="d-block checkbox-container mt-1 mb-3 ms-1">
            <label>
                <b>Wszystkie</b>

                <input
                    type="checkbox"
                    checked={checkBoxes.filter(box => box.checked === false).length == 0}
                    onChange={handleSelectAll}
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
                        checked={checkBoxes.filter(box => box.id === option.id)[0].checked}
                        onChange={() => handleChange(option.id)}
                    />

                    <div className="checkmark"></div>
                </label>
            </div>)
        }
    </>
}

export default CheckBoxFilter