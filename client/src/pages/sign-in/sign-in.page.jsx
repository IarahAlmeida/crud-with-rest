import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { AppContext } from '../../contexts/AppContextProvider';
import { authenticate } from '../../services/authentication.service'
import './sign-in.styles.scss'

const SignIn = () => {
    const { state, dispatch } = useContext(AppContext);
    const history = useHistory()

    useEffect(() => {
        state.authenticated && history.push('/users')
    }, [history, state.authenticated])

    return (
        <section className='hero is-fullheight with-background'>
            <div className='hero-body is-flex is-justify-content-center'>
                <div className='has-text-centered sign-in-box'>
                    <p className='title has-text-dark has-text-weight-semibold text-primary mb-6'>CRUD with REST</p>
                    <p className='subtitle has-text-dark has-text-weight-medium mb-6'>Authentication</p>
                    <Formik
                        initialValues={{ token: '' }}
                        onSubmit={async (values, actions) => {
                            const result = await authenticate(values.token)
                            result ? toast.success('Authenticated!') : toast.error('Authentication failed')
                            dispatch({
                                type: 'AUTHENTICATE',
                                authenticated: result,
                                token: values.token,
                            })
                        }}
                    >
                        {(formikProps) => (
                            <form onSubmit={formikProps.handleSubmit}>
                                <div className='field'>
                                    <div className='control has-icons-left'>
                                        <input
                                            className='input is-rounded'
                                            type='text'
                                            onChange={formikProps.handleChange}
                                            onBlur={formikProps.handleBlur}
                                            value={formikProps.values.token}
                                            name='token'
                                            placeholder='Token'
                                        />
                                        <span className='icon is-small is-left'>
                                            <FontAwesomeIcon icon={faKey} />
                                        </span>
                                    </div>
                                </div>
                                {formikProps.errors.token && <div id='feedback'>{formikProps.errors.token}</div>}
                                <div className='control'>
                                    <button className={`button is-primary is-rounded is-fullwidth mt-6 ${formikProps.isSubmitting ? 'is-loading' : ''}`} type='submit'>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default SignIn
