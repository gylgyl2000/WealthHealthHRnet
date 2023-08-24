import { Table } from 'rsuite'

const { Cell } = Table

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT'
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input" style={{ padding: '7px 0px 10px 8px !important', margin: '-10px' }}
                    defaultValue={rowData[dataKey]}
                    onChange={event => {
                        onChange && onChange(rowData.id, dataKey, event.target.value)
                    }}
                />
                ) : (
                    <span className="table-content-edit-span">{rowData[dataKey]}</span>
                )}
        </Cell>
    )
}

export { EditableCell }