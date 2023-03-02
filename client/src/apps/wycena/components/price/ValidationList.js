import { useState, useEffect } from 'react'
import _ from 'lodash'

import ValidationItem from './ValidationItem'

const ValidationList = ({ list }) => {
    const [localList, setLocalList] = useState([])
    const [isFirstList, setIsFirstList] = useState(true)

    useEffect(() => setIsFirstList(false), [])

    useEffect(() => {
        if (isFirstList) return setLocalList(list)

        const localErrIDs = [], incomingErrIDs = []
        localList.forEach(err => localErrIDs.push(err.errID))
        list.forEach(err => incomingErrIDs.push(err.errID))

        const newErrIDs = _.difference(incomingErrIDs, localErrIDs)
        const remErrIDs = _.difference(localErrIDs, incomingErrIDs)

        let classesRemove = [...localList]
        for (const removed of remErrIDs) {
            for (const local of classesRemove) {
                if (local.errID === removed) local['addClass'] = 'validation-list-item-correct'
            }
        }

        setLocalList(classesRemove)

        setTimeout(() => {
            setLocalList(list)

            const classesAdded = [...list]
            for (const added of newErrIDs) {
                for (const local of classesAdded) {
                    if (local.errID === added) local['addClass'] = 'validation-list-item-wrong'
                }
            }

        }, remErrIDs.length === 0 ? 0 : 1000)

    }, [list])

    return <div className="px-3 pt-3 pb-5">
        <h2 className="font-big fw-bold mb-3">Lista pól do uzupełnienia:</h2>

        {
            localList.map((error, n) => <ValidationItem
                key={n}
                number={n + 1}
                section={error.section}
                message={error.message}
                addClass={error.addClass || ''}
            />)
        }
    </div>
}

export default ValidationList