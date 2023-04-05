const appReducer = (state, action) => {
    if (action.type === 'INIT') {
        const data = action.payload

        if (!data.success) return {
            ...state,
            error: {
                isError: true,
                message: data.message,
                code: data.code
            }
        }

        return { ...state, usersList: data.usersList }
    }

    return { ...state }
}

export default appReducer