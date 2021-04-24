import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component'
import CrudActions from '../../components/crud-actions/crud-actions.component'
import DefaultTable from '../../components/default-table/default-table.component'
import { readItems } from '../../services/crud.service'
import { USERS_SUFFIX } from '../../utils/constans'

const UsersPage = () => {
    const suffix = USERS_SUFFIX
    const [data, setData] = useState([])

    useEffect(() => {
        const getItems = async () => {
            const result = await readItems(suffix)
            if (result.error) {
                setData([])
            } else {
                setData(result)
            }
        }
        getItems()
    }, [suffix])

    const columns = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Website',
                accessor: 'website',
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: (cellProps) => <CrudActions suffix={suffix} id={cellProps.row.values.id} />,
            },
        ],
        [suffix]
    )

    return (
        <div className='container px-2 py-3'>
            <Breadcrumb />
            <div className='block'>
                <div className='box'>
                    <nav className='level'>
                        <div className='level-left'>
                            <p className='level-item is-size-4'>Users List</p>
                        </div>
                        <div className='level-right'>
                            <p className='level-item'>
                                <Link className='button is-success' to={`${suffix}/create`}>
                                    Create
                                </Link>
                            </p>
                        </div>
                    </nav>
                    {data.length > 0 ? <DefaultTable data={data} columns={columns} /> : 'Loading...'}
                </div>
            </div>
        </div>
    )
}

export default UsersPage
