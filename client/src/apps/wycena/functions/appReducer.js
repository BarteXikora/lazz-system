const appReducer = (state, action) => {
    if (action.type === 'CHANGE_TAB') {
        return { ...state, showCalculator: action.payload }
    }

    if (action.type === 'SET_CALCULATOR') {
        return { ...state, calculator: { ...state.calculator, ...action.payload } }
    }

    return { ...state }
}

export default appReducer