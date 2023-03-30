import defaultCalculatorValues from './defaultCalculatorValues'

const appReducer = (state, action) => {
    if (action.type === 'CHANGE_TAB') {
        return { ...state, showCalculator: action.payload }
    }

    if (action.type === 'SET_CALCULATOR') {
        return { ...state }
    }

    if (action.type === 'RESET_CALCULATOR') {
        return { ...state, calculator: defaultCalculatorValues }
    }

    if (action.type === 'SET_PRICES') {
        return { ...state, prices: action.payload }
    }

    if (action.type === 'SET_CURRENCY') {
        return { ...state, currency: action.payload }
    }

    return { ...state }
}

export default appReducer