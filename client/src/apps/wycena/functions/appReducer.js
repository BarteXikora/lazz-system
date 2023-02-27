const appReducer = (state, action) => {
    if (action.type === 'CHANGE_TAB') {
        return { ...state, showCalculator: action.payload }
    }

    if (action.type === 'SET_CALCULATOR') {
        if (action.payload.section === 'times') {
            return {
                ...state, calculator: {
                    ...state.calculator,
                    times: { ...state.calculator.times, ...action.payload.value }
                }
            }
        }

        return { ...state }
    }

    return { ...state }
}

export default appReducer