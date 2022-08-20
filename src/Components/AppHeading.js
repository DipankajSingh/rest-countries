import React from 'react'
import styled from 'styled-components'


const StyledHeading = styled.h1`
color:${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};font-size: 16px;
margin-left: 15px;
`

function AppHeading({ heading }) {
    return (
        <StyledHeading >{heading}</StyledHeading>
    )
}

export default AppHeading
