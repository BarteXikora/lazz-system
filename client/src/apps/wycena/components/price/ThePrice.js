import { useState, useEffect, useContext } from 'react'
import AppContext from '../../functions/AppContext'

import validateCalculator from '../../functions/validateCalculator'

import Invalid from './Invalid'
import ValidationList from './ValidationList'

const ThePrice = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [validate, setValidate] = useState([])
    useEffect(() => setValidate(validateCalculator(
        appState.config, appState.calculator

    )), [appState.calculator])

    return <>
        {
            validate.length === 0 ?
                'all ok'

                :

                <>
                    <Invalid />

                    <ValidationList list={validate} />
                </>
        }
    </>
}

export default ThePrice