import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils/string'

const Breadcrumb = () => {
    const { id } = useParams()
    const location = useLocation()
    const [pathnames, setPathnames] = useState([])

    useEffect(() => {
        setPathnames([])
        location.pathname.split('/').forEach((path) => {
            if (path) {
                setPathnames((previousPathnames) => previousPathnames.concat(path))
            }
        })
    }, [location])

    const routes = {
        signIn: {
            label: 'Sign In',
            to: '/sign-in',
            key: 'sign-in',
        },
        users: {
            label: 'Users',
            to: '/users',
            key: 'users',
        },
    }
    return (
        <nav className='breadcrumb' aria-label='breadcrumbs'>
            <ul>
                {pathnames.map((pathname, i) =>
                    routes[pathname] ? (
                        <li className={pathnames.length === i + 1 ? 'is-active' : ''} key={routes[pathname].key}>
                            <Link to={routes[pathname].to}>{routes[pathname].label}</Link>
                        </li>
                    ) : id ? (
                        <li className='is-active' key={id}>
                            <a href='#!'>{capitalizeFirstLetter(id)}</a>
                        </li>
                    ) : null
                )}
            </ul>
        </nav>
    )
}

export default Breadcrumb
