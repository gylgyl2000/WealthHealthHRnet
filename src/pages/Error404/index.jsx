import styled from 'styled-components'
import Error from "../../components/Error"

export default function Home() {
    return (
        <HomeMain>
            <ErrorSection>
                <Error />
            </ErrorSection>
        </HomeMain>
    )
}
const HomeMain = styled.main`
    height: 84vh;
`

const ErrorSection = styled.section`
    height: inherit;
`