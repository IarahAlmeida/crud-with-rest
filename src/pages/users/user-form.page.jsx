import { Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component'
import FormInputHorizontal from '../../components/form-input-horizontal/form-input-horizontal.component'
import { readItem } from '../../services/crud.service'
import { USERS_SUFFIX } from '../../utils/constans'

const UserFormPage = () => {
    const { id } = useParams()
    const suffix = USERS_SUFFIX
    const formikRef = useRef()

    useEffect(() => {
        const getItem = async () => {
            const result = await readItem(suffix, id)
            if (!result.error) {
                formikRef.current.setFieldValue('id', result.id)
                formikRef.current.setFieldValue('name', result.name)
                formikRef.current.setFieldValue('username', result.username)
                formikRef.current.setFieldValue('email', result.email)
                formikRef.current.setFieldValue('phone', result.phone)
                formikRef.current.setFieldValue('website', result.website)
            }
        }
        if (id !== 'create') {
           getItem()
        }
    }, [suffix, id])

    return (
        <div className='container px-2 py-3'>
            <Breadcrumb />
            <div className='block'>
                <div className='box'>
                    <Formik
                        initialValues={{ name: '', username: '', email: '', phone: '', website: '' }}
                        onSubmit={async (values, actions) => {
                            toast.success('Submitted')
                        }}
                        innerRef={formikRef}
                    >
                        {(formikProps) => (
                            <form onSubmit={formikProps.handleSubmit}>
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.id}
                                    name='id'
                                    label='Id'
                                />
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.name}
                                    name='name'
                                    label='Name'
                                />
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.username}
                                    name='username'
                                    label='Username'
                                />
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.email}
                                    name='email'
                                    label='Email'
                                />
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.phone}
                                    name='phone'
                                    label='Phone'
                                />
                                <FormInputHorizontal
                                    className='input'
                                    type='text'
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    value={formikProps.values.website}
                                    name='website'
                                    label='Website'
                                />
                                <div className='field is-horizontal'>
                                    <div className='field-label' />
                                    <div className='field-body'>
                                        <div className='field'>
                                            <div className='control'>
                                                <button className='button is-primary' type='submit'>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default UserFormPage
