import axios from 'axios'

import { AUTHENTICATION_URL } from '../utils/constans'

export const authenticate = async (token) => {
    const result = await axios
        .get(`${AUTHENTICATION_URL}/${token}`)
        .then((response) => {
            if (response.data.login) {
                return response.data.login
            } else {
                return false
            }
        })
        .catch((error) => {
            console.error(error)
            return false
        })
    return result
}
