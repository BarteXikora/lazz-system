import { APIget } from '../../../functions/api'

const initialize = async (apiLink, authToken) => {
    const response = {
        success: false,
        message: '',
        code: '',
        usersList: [],
        adminsList: [],
        appsAccesses: []
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

    // Apps accesses:
    const appsAccesses = await APIget(apiLink, '/system/users/get-users-apps-accesses', { 'auth-token': authToken })

    if (!appsAccesses.success) {
        response.message = 'Nie udało się wczytać listy dostepów do aplikacji użytkowników.'
        response.code = '@ADMIN/initialize#02'

        return response
    }

    if (!appsAccesses.data.success) {
        response.message = appsAccesses.data.message
        response.code = appsAccesses.data.code

        return response
    }

    response.appsAccesses = appsAccesses.data.data
    response.success = true

    return response
}

export default initialize