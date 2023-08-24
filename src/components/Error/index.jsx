import styled from 'styled-components'
import Error404Img from '../../assets/error-404.png'

export default function Error() {
    return (
        <ErrorWrapper>
            <ErrorImg src={Error404Img} alt='404' />
            <ErrorWrapperTitle>Page not found (404)</ErrorWrapperTitle>
            <ErrorWrapperLink>
                <a href="/WealthHealthHRnet/">Return to homepage.</a>
            </ErrorWrapperLink>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
    position: absolute;
    width: 480px;
    left: 50%;
    top: 50%;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    margin-top: -165px;
    margin-left: -230px;
`
const ErrorImg = styled.img`
    vertical-align: middle;
`
const ErrorWrapperTitle = styled.h2`
    font-size: 18px;
    line-height: 50px;
    color: inherit;
    font-family: inherit;
    font-weight: bolder;
    margin: 0;
`
const ErrorWrapperLink = styled.div`
    cursor: pointer;
    padding: 10px 0;
`