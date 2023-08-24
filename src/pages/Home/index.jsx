import styled from 'styled-components'
import Features from "../../components/Features"

export default function Home() {
    return (
        <HomeMain>
            <FeaturesSection>
                <Features />
            </FeaturesSection>
        </HomeMain>
    )
}
const HomeMain = styled.main`
    height: 84vh;
`

const FeaturesSection = styled.section`
    height: inherit;
`