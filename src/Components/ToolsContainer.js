import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AllCountriesContext } from '../App'

const Select = styled.div`
position: relative;
    height: 2.5rem;
    width: 13rem;
    border-radius: .3rem;
box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);
background-color:${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
@media (max-width:650px) {
    margin-right: auto;
}
    
    p{
        display: flex;
        position: relative;
        justify-content: left;
        align-items: center;
        padding-left: 10px;
        height: 100%;
        width: 100%;
        cursor: pointer;
        :only-child{
        ::after{
            transform: rotate(225deg);
            top: 40%;

        }
    }
        ::after{
            position: absolute;
            content: '';
            transition: transform 100ms ease-in;
            height: .5rem;
            width:.5rem;
            border: 2px solid ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
            border-top-color: transparent;
            border-left-color: transparent;
            right:10px;
            top: 30%;
            transform: rotate(45deg);
            transform-origin: center;
        }
    }
    div{
        display: flex;
        border-radius: inherit;
        flex-direction: column;
        height: max-content;
        width: 100%;
        text-align: center;
        align-items: center;
        overflow: hidden;
        background-color: inherit;
        box-shadow: inherit;

        margin-top: 5px;
        span{
            background-color:inherit;
            padding: 10px 20px;
            width: 100%;
            :hover,:active{
                cursor: pointer;
                filter: contrast(.5);
            }
        }
    }
`
const Container = styled.div`
color:${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
padding: 0 25px;
display: flex;
justify-content: space-between;
top: 85px;
width: 100%;
position: relative;
z-index: 10;

@media (max-width:650px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
`
const SearchTool = styled.div`
display: flex;
width: 17rem;
@media (max-width:650px) {
    width: min(100vw - 3rem, 550px);
}
height: 2.5rem;
background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);
 input {
    border: none;
    height: 100%;
    color: inherit;
    width:100% ;
    background-color: transparent;
    :focus {
        border: none;
        outline: none;
    }
}
border-radius: .2rem;
label{
    display: grid;
    place-items: center;
   height: 100%;
   width: 5rem;
   svg{
    fill:${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
    height: 50%;
    width: 50%;
   }
}
`

function ToolsContainer() {
    const [query, setQuery] = useState('')
    const { original, setCountries } = useContext(AllCountriesContext)
    const options = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'
    ]
    const [selectedOption, setSelectedOption] = useState('Filter by region')
    const [isToggled, setIsToggled] = useState(false)
    useEffect(() => {
        const handleChange = setTimeout(() => {
            query !== '' ? setCountries(original.filter(({ name }) => name.toLowerCase().indexOf(query.toLowerCase()) > -1)) : setCountries(original)
        }, 1000)
        return () => clearTimeout(handleChange)
    }, [query])

    const handleFilter = (e) => {
        setCountries(
            original.filter(({ region }) => region.toLowerCase() === e.target.textContent.toLowerCase()))
    }

    return (
        <Container>
            <SearchTool>
                <label htmlFor='search'>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 487.95 487.95" xml-space="preserve">
                        <g>
                            <g>
                                <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/>
                            </g>
                        </g>
                    </svg>
                </label>
                <input
                    onChange={e => {
                        setQuery(e.target.value.toLowerCase())
                    }}
                    type="text"
                    id='search'
                    value={query}
                    placeholder='Search for a country...' />
            </SearchTool>
            <Select>
                <p onClick={() => setIsToggled(!isToggled)}>{selectedOption}</p>
                {isToggled && <div>
                    {options.map((v, i) => {
                        return <span key={i} onClick={(e) => {
                            handleFilter(e)
                            setIsToggled(false)
                            setSelectedOption(e.target.textContent)
                        }} >{v}</span>
                    })}
                </div>}
            </Select>
        </Container>
    )
}

export default ToolsContainer
