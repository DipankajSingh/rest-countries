import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeChangerContex, ThemeModeData } from '../App'

const StyledThemeMode = styled.div`
padding: 10px 15px;
display: flex;
height: max-content;
gap: 5px;
width: max-content;
margin-right: 15px;
color: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
cursor: pointer;

div{
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
    position: relative;
    overflow: hidden;
    ::after{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 100%;
        background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
        top: -5px;
        transform: translateX(${props => props.theme.theme === 'dark' ? '30%' : '100%'});
        transition: transform 200ms ease-in;
    }
}
`

function ThemeMode() {

    const setMode = useContext(ThemeChangerContex)
    const mode = useContext(ThemeModeData)

    return (
        <StyledThemeMode onClick={() => {
            mode === 'dark' ? setMode('light') : setMode('dark')
            document.body.style.backgroundColor = mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)'
        }} >
            <div></div> {mode.charAt(0).toUpperCase() + mode.slice(1)}

        </StyledThemeMode>
    )
}

export default ThemeMode
