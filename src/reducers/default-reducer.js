export const defaultReducer = (state, action) => {
    switch (action.type) {
        case 'CURRENT_USER':
            return { ...state, currentUser: action.user }
        case 'AUTHENTICATE':
            return { ...state, authenticated: action.authenticated, token: action.authenticated ? action.token : undefined }
        default:
            return state
    }
}
