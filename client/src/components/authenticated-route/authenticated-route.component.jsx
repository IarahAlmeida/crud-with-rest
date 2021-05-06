import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContextProvider'

const AuthenticatedRoute = (props) => {
    const { state } = useContext(AppContext)
    return state.authenticated ? <Route {...props} /> : <Redirect to='/sign-in' />
}

export default AuthenticatedRoute
