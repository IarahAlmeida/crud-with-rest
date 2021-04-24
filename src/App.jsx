import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify'
import AppContextProvider from './contexts/AppContextProvider';
import AuthenticatedRoute from './components/authenticated-route/authenticated-route.component'
import SignIn from './pages/sign-in/sign-in.page'
import UsersPage from './pages/users/users.page'
import UserFormPage from './pages/users/user-form.page'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SignIn} />
                    <Route exact path='/sign-in' component={SignIn} />
                    <AuthenticatedRoute exact path='/users' component={UsersPage} />
                    <AuthenticatedRoute exact path='/users/:id' component={UserFormPage} />
                </Switch>
                <ToastContainer transition={Flip} autoClose={3000} closeOnClick pauseOnHover />
            </BrowserRouter>
        </AppContextProvider>
    )
}

export default App
