import React from 'react'

const FormInputHorizontal = ({ label, help, ...otherProps }) => {
    console.log(otherProps)
    return (
        <div className='field is-horizontal'>
            <div className='field-label is-normal'>
                <label className='label'>{label}</label>
            </div>
            <div className='field-body'>
                <div className='field'>
                    <div className='control'>
                        <input {...otherProps} />
                    </div>
                    {help && <p className='help is-danger'>{help}</p>}
                </div>
            </div>
        </div>
    )
}

export default FormInputHorizontal
