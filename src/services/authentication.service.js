import axios from 'axios'

import { API_URL } from '../utils/constans'

export const authenticate = async (token) => {
    const result = await axios
        .get(`${API_URL}/${token}`)
        .then((response) => {
            if (response.data.login) {
                return response.data.login
            } else {
                return false
            }
        })
        .catch((error) => {
            console.log(error)
            return false
        })
    return result
}
