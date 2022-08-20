import React, { useContext } from 'react'
import styled from 'styled-components'
import { AllCountriesContext } from '../App'
import Card from './Card'

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    height: calc(100vh - 145px);
    position: fixed;
    top: 140px;
    z-index: 1;
    overflow: auto;
    @media (max-width:650px) {
        top: 220px;
    height: calc(100vh - 225px);
    }
`

function ShowCards() {
    const { countries } = useContext(AllCountriesContext)

    return (
        <Container >
            {countries.map(({ name, flags, population, region, capital }, index) => {
                return <Card
                    key={index}
                    country={name}
                    img={flags.svg}
                    population={population}
                    region={region}
                    capital={capital}
                />
            })}
        </Container>
    )
}

export default ShowCards
