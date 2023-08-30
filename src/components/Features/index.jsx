import { infoFeatures } from '../../infos'
import styled from 'styled-components'

export default function Features() {
    return (
        <FeatureItem>
            <FeatureIcon src={infoFeatures.image} alt={infoFeatures.alt} width='30%' height='auto' />
            <FeatureItemTitle>{infoFeatures.title}</FeatureItemTitle>
            <p>{infoFeatures.text}</p>
        </FeatureItem>
    )
}

const FeatureItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: inherit;
    align-items: center;
    & p {
        font-weight: bold;
    }
`
const FeatureIcon = styled.img`
    width: 20vw;
    border: 10px solid #596e07;
    border-radius: 15%;
    box-shadow: gray 0 5px 15px;
`
const FeatureItemTitle = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`