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

        data.adminsList.forEach(admin => {
            data.usersList.forEach(user => {
                if (user.id === admin.id) user.isAdmin = true
            })
        })

        data.usersList.forEach(user => {
            user.appsAccess = []

            data.appsAccesses.forEach(app => {
                if (app.user_id === user.id) user.appsAccess.push(app.app_id)
            })
        })

        return {
            ...state,
            usersList: data.usersList,
            privilagesList: data.privilagesList,
            error: { ...state.error, isError: false }
        }
    }

    return { ...state }
}

export default appReducer