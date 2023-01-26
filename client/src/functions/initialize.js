import { getAPILink, APIget } from './api'

const initialize = async (authToken) => {
    const response = {
        success: false,
        data: {
            user: {},
            error: { isError: false, message: '', code: '' },
            appsList: []
        }
    }

    let apiLink = await getAPILink()

    if (!authToken) authToken = localStorage.getItem('auth-token')
    if (apiLink) {
        apiLink = apiLink.data.API_link

        response.data.apiLink = apiLink

        const userData = await APIget(apiLink, '/system/users/who-am-i', { 'auth-token': authToken })

        if (!userData.success) {
            response.data.error.isError = true
            response.data.error.message = 'Wystąpił błąd i nie udało się wczytać danych użytkownika.'
            response.data.error.code = '@SYSTEM/initialize/who-am-i#00'

            return response
        }

        const answer = userData.data

        if (!answer.success) {
            response.data.error.message = answer.message
            response.data.error.code = answer.error

            return response
        }

        if (answer.data.loggedIn) {
            response.data.user.loggedIn = true
            response.data.user.id = answer.data.id
            response.data.user.name = answer.data.name
            response.data.user.email = answer.data.email
            response.data.user.admin = answer.data.admin
            response.data.user.authToken = authToken

            response.data.appsList = answer.data.appsList
        }
    }

    return { ...response, success: true }
}

export default initialize