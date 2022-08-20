import React from 'react'
import styled from 'styled-components'
import AppHeading from './AppHeading'
import ThemeMode from './ThemeMode'

const StyledNavbar = styled.nav`
background-color:${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};

height: 3.2rem;
width: 100vw;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
z-index: 10;
box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);
`

function Navbar() {
    return <StyledNavbar >
        <AppHeading heading={'Where in the world?'} />
        <ThemeMode />
    </StyledNavbar>
}

export default Navbar
