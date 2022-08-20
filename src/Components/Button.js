import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
color: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
padding:7px 1.5rem;
border: none;
border-radius:.2rem;
box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);
cursor: pointer;
:hover, :active {
    filter: brightness(.8);
}
`

export default function Button({ onClick, className, btnLabel }) {
    console.log('i am rerendered!')
    return (
        <Btn className={className} onClick={() => { onClick() }} >{btnLabel}</Btn>
    )
}
