import { Table, Button } from 'rsuite'
import EditIcon from '@rsuite/icons/Edit'

const { Cell } = Table

const ActionCell = ({ rowData, dataKey, onClick, onclick, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px 0px' }}>
            <Button
                appearance="link"
                onClick={rowData.status === 'EDIT' ?
                    () => onclick(rowData.id) :
                    () => {onClick(rowData.id)}
                }
            >
                {rowData.status === 'EDIT' ? 'Save' : <EditIcon />}
            </Button>
        </Cell>
    )
}

export { ActionCell }