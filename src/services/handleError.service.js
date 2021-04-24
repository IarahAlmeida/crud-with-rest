import { AUTHENTICATION_ERROR_MESSAGE, DEFAULT_ERROR_MESSAGE, REQUEST_ERROR_MESSAGE } from '../utils/constans'

const defaultError = {
    status: 0,
    throwedAt: new Date().toISOString(),
    message: DEFAULT_ERROR_MESSAGE,
}

export const handleError = (error) => {
    if (error.response) {
        return { error: handleErrorByStatus(error) }
    } else if (error.request) {
        return { error: { ...defaultError, status: error.request.status, message: REQUEST_ERROR_MESSAGE } }
    } else {
        return { error: defaultError }
    }
}

const handleErrorByStatus = (error) => {
    if (error.response.status === 400) {
        return {
            ...defaultError,
            status: error.response.status,
            message: error.response.data.message,
        }
    } else if (error.response.status === 401) {
        return {
            ...defaultError,
            status: error.response.status,
            message: AUTHENTICATION_ERROR_MESSAGE,
        }
    } else {
        return {
            ...defaultError,
            status: error.response.status,
        }
    }
}
