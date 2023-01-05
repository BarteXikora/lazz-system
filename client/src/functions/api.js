import axios from 'axios'

const getAPILink = async () => {
    const config = await axios
        .get('/config/api.json')
        .then(config => { return config })
        .catch(() => { return false })

    return config
}

const APIget = async (api, link, headers = {}) => {
    return await axios.get(api + link, { headers })
        .then(answer => { return { success: true, data: answer.data } })
        .catch(error => { return { success: false, message: 'Nie udało się nawiązać połączenia z API.' } })
}

const APIpost = async (api, link, body = {}) => {
    return await axios.post(api + link, body)
        .then(answer => { return { success: true, data: answer.data } })
        .catch(error => { return { success: false, message: 'Nie udało się nawiązać połączenia z API.' } })
}

export { APIget, APIpost, getAPILink }