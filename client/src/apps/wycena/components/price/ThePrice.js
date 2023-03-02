import { useState, useEffect, useContext } from 'react'
import AppContext from '../../functions/AppContext'

import validateCalculator from '../../functions/validateCalculator'
import calculate from '../../functions/calculate'

import PricesHeader from './PricesHeader'
import PricesTable from './PricesTable'
import Invalid from './Invalid'
import ValidationList from './ValidationList'

const ThePrice = () => {
    const { appState, appDispatch } = useContext(AppContext)

    const [validate, setValidate] = useState([])
    const [prices, setPrices] = useState({})


    useEffect(() => {
        const validation = validateCalculator(appState.config, appState.calculator)

        setValidate(validation)

        if (validation.length === 0) setPrices(calculate(appState.config, appState.calculator))

    }, [appState.calculator])

    return <>
        {
            validate.length === 0 ?
                <>
                    <PricesHeader />

                    <PricesTable prices={prices} />
                </>

                :

                <>
                    <Invalid />

                    <ValidationList list={validate} />
                </>
        }
    </>
}

export default ThePrice