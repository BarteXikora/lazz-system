import { APIget } from '../../../functions/api'

const initialize = async (apiLink, authToken) => {
    const response = {
        success: false,
        message: '',
        code: '',
        usersList: []
    }

    const usersList = await APIget(apiLink, '/system/users/get-users', { 'auth-token': authToken })

    if (!usersList.success) {
        response.message = 'Nie udało się wczytać listy uzytkowników.'
        response.code = '@ADMIN/initialize#00'

        return response
    }

    if (!usersList.data.success) {
        response.message = usersList.data.message
        response.code = usersList.data.code

        return response
    }

    response.usersList = usersList
    response.success = true

    return response
}

export default initialize