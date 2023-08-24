import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEmployee } from '../../features/employeesSlice'
import { Table, Button, Modal } from 'rsuite'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import { infoTable } from '../../infos'

const { Column, HeaderCell, Cell } = Table

export default function EmployeesTable({ data }) {
    const dispatch = useDispatch()
    const [openDel, setOpenDel] = useState(false)
    const handleOpenDel = () => setOpenDel(true)
    const handleCloseDel = () => setOpenDel(false)
    const [dataId, setDataId] = useState()

    const handleOkDel = (event) => {
        dispatch(deleteEmployee(dataId))
        handleCloseDel(event)
    }
    return (
        <>
            <Table
                height={600}
                data={data}
                onRowClick={rowData => {console.log(rowData.id)}}
            >
                {infoTable.map((info, i) => (
                    <Column width={info.width} align={info.align} fixed={info.fixed} key={`info-${i}`}>
                        <HeaderCell>{info.title}</HeaderCell>
                        <Cell dataKey={info.dataKey} />
                    </Column>
                ))}
                <Column width={50} fixed="right">
                    <HeaderCell><EditIcon /></HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                            <EditIcon />
                        </Button>
                    )}
                    </Cell>
                </Column>
                <Column width={50} fixed="right">
                    <HeaderCell><TrashIcon /></HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <Button
                            appearance="link"
                            onChange = {setDataId(`${rowData.id}`)}
                            onClick={handleOpenDel}
                        >
                            <TrashIcon />
                        </Button>
                    )}
                    </Cell>
                </Column>
            </Table>
            <Modal open={openDel} onClose={handleCloseDel} size="xs" style={{ margin: '20vh auto' }}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>'Are you sure?'</Modal.Body>
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
            </Modal>
        </>
    )
}