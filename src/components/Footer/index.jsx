import styled from 'styled-components'

export default function Footer({ text }) {
    return (
    <FooterContainer>
        <span>{text}</span>
    </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    text-align: center;
    border-top: 2px solid gray;
    background-color: #596e07;
    padding: 2rem 0 3.5rem;
    height: 5vh;
    & span {
        color: white;
        margin: 0;
        padding: 0;
    }
`