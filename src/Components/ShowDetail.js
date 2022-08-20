import React, { useContext } from 'react'
import styled from 'styled-components'
import { AllCountriesContext, DetailToggles } from '../App'
import Button from './Button'
const Btn = styled.button`
    position: fixed;
    top: 4.2rem;
    left: 2.2rem;
background-color: ${props => props.theme.theme === 'dark' ? props.theme.DrkElm : props.theme.LitElm};
height: 2rem;
width: 5.5rem;
border: none;
border-radius:.2rem;
svg{
    padding: 5px 10px;
    fill: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
    height: 100%;
    width: 100%;
}
box-shadow: 0 0 5px 1px rgb(0, 0, 0, .4);
cursor: pointer;
:hover, :active {
    filter: brightness(.8);
}
`
const Container = styled.div`
height: calc(100vh - 3.2rem);
overflow-x: auto;
width: 100%;
position: relative;
display: inline-block;
top: 3.2rem;
color: ${props => props.theme.theme === 'dark' ? props.theme.DrkFg : props.theme.LitFg};
`
const Img = styled.div`
width: clamp(350px, 30vw, 450px);
height: clamp(210px, 27vw, 270px);
margin-left: 1rem;
img{
    height: 100%;
    width: 100%;
}
@media (max-width:650px) {
        width: 90vw;
        margin: 0;
        margin-top: 60px;
        max-width: 17rem;
}
`
const Div1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    gap: 20px;
    @media (max-width:650px) {
      flex-direction: column;  
      overflow: auto;
      height: auto;
      gap: 70px;
      margin-top: 19px;
    }
`
const Div2 = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto;
    height: clamp(190px,25vw, 250px);
    font-size: 14px;
    width: 50%;
    margin-right: 2rem;

    @media (max-width:650px) {
        width: 90vw;
        max-width: 17rem;
        height: auto;
        margin: 0;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
}
`
const Div3 = styled.div`
    text-align: left;
    position: relative;
    h5{
        width: max-content;
        margin-top: 5px;
        font-size: 14px;

        span{
        font-weight: 400;
    }
    }
    text-transform: capitalize;
`
const Name = styled.p`
    position: absolute;
    top: -65px;
    text-align: center;
    width: max-content;
    margin:1rem;
    font-weight: 900;
    font-size: clamp(1rem, 1vw + 16px, 2rem);
`
const Div4 = styled.div`
grid-column: 1 / span 3;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 10px;
h6{
    font-size: 15px;
}
@media (max-width:650px) {
    grid-column: none;
}
`

function ShowDetail() {
    const { setTools } = useContext(DetailToggles)
    const { setDetails, countries, details } = useContext(AllCountriesContext)

    // const [detail,setDetail]=useState({})

    return (
        <Container>
            <Btn
                onClick={() => {
                    setTools(true)
                }}
            >
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 486.975 486.975" xml-space="preserve">
                    <g>
                        <path d="M473.475,230.025h-427.4l116-116c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-139,139c-5.3,5.3-5.3,13.8,0,19.1
       l139,139c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-116-116h427.5c7.5,0,13.5-6,13.5-13.5
       S480.975,230.025,473.475,230.025z"/>
                    </g>
                </svg>
            </Btn>
            <Div1>
                <Img><img src={details.img} alt={details.country} /></Img>
                <Div2>
                    <Div3>
                        <Name>{details.country}</Name>
                        <h5>native name: <span>{details.nativeName}</span> </h5>
                        <h5>population: <span>{details.population}</span> </h5>
                        <h5>region: <span>{details.region}</span> </h5>
                        <h5>sub region: <span>{details.subRegion}</span> </h5>
                        <h5>capital: <span>{details.capital}</span> </h5>
                    </Div3>
                    <Div3>
                        <h5>top lavel domain: <span>{details.tld}</span> </h5>
                        <h5>currency: <span>{details.currency}</span> </h5>
                        <h5>language: <span>{details.language}</span> </h5>
                    </Div3>
                    <Div4>
                        <h6>border countries:</h6>
                        {details.borders.map((value, i) => {
                            return <Button onClick={() => {
                                const thatArr = countries.filter(anotherCountry => anotherCountry.alpha3Code === value)
                                const {
                                    name,
                                    flag,
                                    nativeName,
                                    population,
                                    subregion,
                                    capital,
                                    topLevelDomain,
                                    currency = thatArr[0].currencies[0].name,
                                    languages,
                                    region,
                                    borders = []
                                } = thatArr[0]
                                console.log(thatArr)
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
                            }}
                                btnLabel={value} key={i}
                            />
                        })}
                        {details.borders.length === 0 ? 'no borders' : ''}
                    </Div4>
                </Div2>
            </Div1>
        </Container>
    )
}

export default ShowDetail
