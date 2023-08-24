import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Modal, Pagination, Input, InputGroup } from 'rsuite'
import { emmployeesInfosSelector } from '../../utils/selectors'
import { getEmployees, deleteEmployee, updateEmployee } from '../../features/employeesSlice'
import { infoTable } from '../../infos'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import SearchIcon from '@rsuite/icons/Search'
import styled from 'styled-components'
import { EditableCell } from '../../components/Table/EditableCell'
import { ActionCell } from '../../components/Table/ActionCell'
import { ImageCell } from '../../components/Table/ImageCell'
import Moodal from '../../components/Modal'

import * as _ from 'lodash'

const { Column, HeaderCell, Cell } = Table

export default function CurrentEmployees() {
    const dispatch = useDispatch()
    const [dataEmployees, setDataEmployees] = useState([])
    const [dataId, setDataId] = useState()
    const [openDel, setOpenDel] = useState(false)
    const [sortColumn, setSortColumn] = useState()
    const [sortType, setSortType] = useState()
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    
    const employees = useSelector(state => emmployeesInfosSelector(state))
    // console.log({employees})
    const handleOpenDel = () => setOpenDel(true)
    const handleCloseDel = () => setOpenDel(false)

    useEffect(() => {
        try {
            dispatch(getEmployees())
        } catch (error) {
            console.log('ERROR GETTING EMPLOYEES DATA -', error)
        }
    }, [dispatch])

    useEffect(() => {
        setDataEmployees(employees)
    }, [employees])
    console.log(dataEmployees)

    const dataPaged = dataEmployees.filter((v, i) => {
        const start = limit * (page - 1)
        const end = start + limit
        return i >= start && i < end
    })
    const getData = () => {
        if (sortColumn && sortType) {
            return dataPaged.sort((a, b) => {
                let x = a[sortColumn]
                let y = b[sortColumn]
                if (typeof x === 'string') {
                    x = x.charCodeAt()
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt()
                }
                if (sortType === 'asc') {
                    return x - y
                } else {
                    return y - x
                }
            });
        }
        return dataPaged
    }
    
    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSortColumn(sortColumn)
            setSortType(sortType)
        }, 500)
    }

    const handleChangeLimit = dataKey => {
        setPage(1)
        setLimit(dataKey)
    }

    const handleDelBtn = (event, id) => {
        handleOpenDel(event)
        setDataId(id)
    }
    const handleOkDel = ((event) => {
        dispatch(deleteEmployee(dataId))
        dispatch(getEmployees())
        setDataEmployees(employees)
        handleCloseDel(event)
    })
    // console.log(dataEmployees)
    // console.log(getData())
    
    
    const handleChange = (id, key, value) => {
        const nextData = _.cloneDeep(getData())
        nextData.find(item => item.id === id)[key] = value
        // console.log(nextData)
        setDataEmployees(nextData)
        // console.log(data)
    }

    const handleEditState = (id) => {
        const nextData = _.cloneDeep(getData())
        const activeItem = nextData.find(item => item.id === id)
        activeItem.status = activeItem.status ? null : 'EDIT'
        setDataEmployees(nextData)
    }

    const handleSaveState = id => {
        dispatch(updateEmployee(dataEmployees.find(item => item.id === id)))
        dispatch(getEmployees())
        setDataEmployees(employees)
    }
    const [filter, setFilter] = useState(getData())
    const [filterText, setFilterText] = useState('')
    const filteredData = (text) => {
        setFilterText(text)
        const filtered = text === '' ? getData() : getData().filter(
            (employee) =>
                employee.firstName.toLowerCase().includes(text.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(text.toLowerCase()) ||
                employee.city.toLowerCase().includes(text.toLowerCase()) ||
                employee.state.toLowerCase().includes(text.toLowerCase()) ||
                employee.department.toLowerCase().includes(text.toLowerCase())
        )
        setFilter(filtered)
    }

    return (
        <UserMain>
            <h2>Current Employees</h2>
            <div style={{ display: 'flex', justifyContent: 'end'}}>
            <InputGroup size="md" style={{ width: 300, marginBottom: 10 }}>
                <Input
                    placeholder="Search"
                    value={filterText}
                    onChange={filteredData} />
                <InputGroup.Addon>
                    <SearchIcon />
                </InputGroup.Addon>
            </InputGroup>
            </div>
            <Table
                height={420}
                data={filterText ? filter : getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                onRowClick={rowData => {console.log(rowData.id)}}
            >
                 <Column width={80} align="center">
                    <HeaderCell>Avatar</HeaderCell>
                    <ImageCell dataKey="avatar" />
                </Column>
                {infoTable.map((info, i) => (
                    <Column width={info.width} flexGrow={2} key={i} sortable resizable>
                        <HeaderCell>{info.title}</HeaderCell>
                            <EditableCell dataKey={info.dataKey} onChange={handleChange} />
                    </Column>
                ))}

                <Column flexGrow={1}>
                    <HeaderCell><EditIcon /></HeaderCell>
                    <ActionCell dataKey='id' onClick={handleEditState} onclick={handleSaveState} />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><TrashIcon /></HeaderCell>
                    <Cell style={{ padding: '6px 0' }}>
                    {rowData => (
                        <Button
                            appearance="link"
                            onClick={e => handleDelBtn(e, `${rowData.id}`)}
                        >
                            <TrashIcon />
                        </Button>
                    )}
                    </Cell>
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={dataEmployees.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
            <Moodal
                open={openDel}
                handleClose={handleCloseDel}
                message='Are you sure you want to delete this record?'
                action={e => handleOkDel(e)}
                title='Caution!'
            />
            {/* <Modal open={openDel} onClose={handleCloseDel} size="xs" style={{ margin: '20vh auto' }}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>'Are you sure you want to delete this record?'</Modal.Body>
                <Modal.Footer>
                    <Button
                        id='okButton'
                        onClick={e => handleOkDel(e)}
                        appearance="primary">
                            Ok
                    </Button>
                    <Button onClick={handleCloseDel} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </UserMain>
    )
}

const UserMain = styled.main`
    flex: 1;
    height: 84vh;
    margin: 0 auto;
    width: 90%;
    & h2 {
        text-align: center;
        padding: 5vh 0;
    }
    @media (min-width: 1081px) {
        width: 80%;
    }
`