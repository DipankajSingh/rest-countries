import React, { createContext, useEffect, useState } from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import ShowCards from './Components/ShowCards'
import ShowDetail from './Components/ShowDetail'
import Nav from './Components/Navbar'
import ToolsContainer from './Components/ToolsContainer'
const Navbar = React.memo(Nav)
const ThemeChangerContex = createContext(undefined)
const ThemeModeData = createContext(undefined)
const DetailToggles = createContext(undefined)
const AllCountriesContext = createContext(undefined)

const spin = keyframes`
0%{
  transform: rotate(0) translateX(-50%);
}
100%{
  transform: rotate(360deg) translateX(-50%);
}
`
const Spinner = styled.div`
position: absolute;
height: 3rem;
width: 3rem;
border: .3rem rgb(0, 0, 0, .3) solid;
border-top-color: #2ce42c ;
border-radius: 50%;
top: 35%;
left: 50%;
transform: translateX(-50%) rotate(0);
transform-origin: left;
animation: ${spin} infinite 1.3s linear;
`
const Parent = styled.div`
position: relative;
height: 100vh;
width: 100vw;
`
let causeOneTimeFetch = false

function App() {
  const [tools, setTools] = useState(true)
  const [themeMode, setThemeMode] = useState('dark')
  const theme = {
    DrkBg: 'hsl(207, 26%, 17%)',
    DrkFg: 'hsl(0, 0%, 100%)',
    DrkElm: 'hsl(209, 23%, 22%)',
    LitBg: 'hsl(0, 0%, 98%)',
    LitFg: 'hsl(200, 15%, 8%)',
    LitElm: 'hsl(0, 0%, 100%)',
    LitInput: 'hsl(0, 0%, 52%)',
    theme: themeMode
  }
  const [original, setOriginal] = useState([])
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    img: null,
    country: 'A really big name',
    nativeName: 'this is name',
    population: '123456789',
    region: 'african',
    subRegion: 'hello there',
    capital: 'thiscap isnice',
    tld: '.hhg',
    currency: 'rupeee euro',
    language: 'hindi, english',
    borders: null
  })


  const url = 'https://restcountries.com/v2/all'
  const fetchCountries = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setOriginal(data)
    setCountries(data)
    setIsLoading(false)
  }
  useEffect(() => {

    if (causeOneTimeFetch === false) {
      fetchCountries()
    }
    return () => causeOneTimeFetch = true
  }, []);

  return (
    <AllCountriesContext.Provider value={{ countries, setCountries, details, setDetails, original }}>
      <DetailToggles.Provider value={{ tools, setTools }}>
        <ThemeModeData.Provider value={themeMode}>
          <ThemeChangerContex.Provider value={setThemeMode} >
            <Parent>
              <ThemeProvider theme={theme}>
                <Navbar />
                {isLoading && <Spinner />}
                {tools && <ToolsContainer />}
                {tools && <ShowCards />}
                {!tools && <ShowDetail />}
              </ThemeProvider>
            </Parent>
          </ThemeChangerContex.Provider>
        </ThemeModeData.Provider>
      </DetailToggles.Provider>
    </AllCountriesContext.Provider>
  )
}

export { App, ThemeChangerContex, ThemeModeData, AllCountriesContext, DetailToggles }
