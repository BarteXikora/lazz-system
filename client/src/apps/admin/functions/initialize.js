import { APIget } from '../../../functions/api'

const initialize = async (apiLink, authToken) => {
    const response = {
        success: false,
        message: '',
        code: '',
        usersList: [],
        adminsList: []
    }

    // Users list:
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

    response.usersList = usersList.data.data

    // Admins list:
    const adminsList = await APIget(apiLink, '/system/users/get-admins', { 'auth-token': authToken })

    if (!adminsList.success) {
        response.message = 'Nie udało się wczytać listy administratorów systemu.'
        response.code = '@ADMIN/initialize#01'

        return response
    }

    if (!adminsList.data.success) {
        response.message = adminsList.data.message
        response.code = adminsList.data.code

        return response
    }

    response.adminsList = adminsList.data.data
    response.success = true

    return response
}

export default initialize