import React, { useContext } from 'react'
import styled from 'styled-components'
import { AllCountriesContext, DetailToggles } from '../App'

const Container = styled.div`
cursor: pointer;
    width: 14rem;
    padding-bottom: 15px;
    height: max-content;
    background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
    color: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
    img{
        height: 40%;
        width: 100%;
        background-color: #5187ec;
        border-radius: .3rem  .3rem 0 0;
    }
    border-radius: .3rem;
    h2 {
        margin:20px 0;
        width: 100%;
        padding-left: 20px;
    }
    box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);

`
const Info = styled.div`
    width: 100%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 800;
        span {
            font-weight: 400;
        }
    }
`
function Card({ country, img, population, region, capital }) {
    const { setDetails, countries } = useContext(AllCountriesContext)
    const { setTools } = useContext(DetailToggles)

    return (
        <Container onClick={() => {
            const thatCountry = countries.filter(anotherCountry => anotherCountry.name === country)
            const {
                name,
                flag,
                nativeName,
                population,
                subregion,
                capital,
                topLevelDomain,
                currency = thatCountry[0].currencies[0].name,
                languages,
                region,
                borders = []
            } = thatCountry[0]
            setDetails({
                country: name,
                borders: borders,
                img: flag,
                nativeName: nativeName,
                population: population,
                region: region,
                subRegion: subregion,
                capital: capital,
                tld: topLevelDomain,
                currency: currency,
                language: Array.from(languages).map(({ nativeName }) => nativeName + " ")
            })
            setTools(false)
        }} >
            <img src={img} alt={country} />
            <h2>{country}</h2>
            <Info>
                <h3>Population: <span>{population}</span></h3>
                <h3>Region: <span>{region}</span></h3>
                <h3>Capital: <span>{capital}</span></h3>
            </Info>
        </Container>
    )
}

export default Card

