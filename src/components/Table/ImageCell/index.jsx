import { Table } from 'rsuite'

const { Cell } = Table

const imageUrl = '/WealthHealthHRnet/avatar/'

const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div
            style={{
                width: 40,
                height: 40,
                background: '#f5f5f5',
                borderRadius: 6,
                marginTop: 2,
                overflow: 'hidden',
                display: 'inline-block'
            }}
        >
            <img alt='avatar' src={`${imageUrl}${rowData.avatar}`} width="40" />
        </div>
    </Cell>
)

export { ImageCell }