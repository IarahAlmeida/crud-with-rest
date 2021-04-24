import axios from 'axios'
// import { API_URL } from '../utils/constans'
import { handleError } from './handleError.service'

/* overwriting default api url */
const API_URL = 'https://jsonplaceholder.typicode.com'

export const readItems = async (suffix) => {
    const result = await axios
        .get(`${API_URL}/${suffix}`)
        .then((response) => response.data)
        .catch((error) => handleError(error))
    return result
}

export const readItem = async (suffix, id) => {
    const result = await axios
        .get(`${API_URL}/${suffix}/${id}`)
        .then((response) => response.data)
        .catch((error) => handleError(error))
    return result
}

export const createItem = async (suffix, item) => {
    const result = await axios
        .post(`${API_URL}/${suffix}`, item)
        .then((response) => response.data)
        .catch((error) => handleError(error))
    return result
}

export const updateItem = async (suffix, id, item) => {
    const result = await axios
        .put(`${API_URL}/${suffix}/${id}`, item)
        .then((response) => response.data)
        .catch((error) => handleError(error))
    return result
}

export const deleteItem = async (suffix, id) => {
    const result = await axios
        .delete(`${API_URL}/${suffix}/${id}`)
        .then((response) => response.status)
        .catch((error) => handleError(error))
    return result
}