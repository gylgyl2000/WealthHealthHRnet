import styled from 'styled-components'
import { Toggle } from 'rsuite'

const HandleThemeButton = ({ handle }) => {
    return (
        <ToggleBtn>
            <Toggle size="md" checkedChildren='🌜' unCheckedChildren='🌞' onChange={handle} />
        </ToggleBtn>
    )
}

const ToggleBtn = styled.div`
    top: 14px;
    position: relative;
    & label {
        float: right;
        right: 5px;
        border: 2px solid #ccc;
        border-radius: 26px;
        & span.rs-toggle-inner {
            font-size: 20px;
            line-height: 1.3;
            margin-left: 30px;
            margin-right: 5px;
        }
    }
    & label.rs-toggle-checked span.rs-toggle-inner {
        margin-left: 5px !important;
        margin-right: 30px !important;
    }
`
export {
    HandleThemeButton }