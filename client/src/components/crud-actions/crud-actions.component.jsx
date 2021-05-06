import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteItem } from '../../services/crud.service'
import { toast } from 'react-toastify'
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constans'

const CrudActions = (props) => {
    const location = useLocation()

    const handleDelete = async () => {
        const response = await deleteItem(props.suffix, props.id)
        if (response === 204) {
            toast.success('Delete successful.')
        } else {
            toast.warning(DEFAULT_ERROR_MESSAGE)
        }
        props.setShouldUpdate(true)
    }

    return (
        <div className='buttons'>
            <Link className='button is-outlined is-info is-small' to={`${location.pathname}/${props.id}`}>
                <span className='icon is-small'>
                    <FontAwesomeIcon icon={faEye}/>
                </span>
            </Link>
            <button className='button is-outlined is-danger is-small' onClick={handleDelete}>
                <span className='icon is-small'>
                    <FontAwesomeIcon icon={faTrash}/>
                </span>
            </button>
        </div>
    )
}

export default CrudActions
