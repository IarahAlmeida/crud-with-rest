import React, { createContext, useReducer } from 'react'
import { defaultReducer } from '../reducers/default-reducer'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(defaultReducer, { authenticated: false, token: undefined, currentUser: null })

    return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}

export default AppContextProvider
