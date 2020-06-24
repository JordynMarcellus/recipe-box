import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

export const StyledGridContainer = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 400px) {
    display: grid;
    grid-gap: 2rem 1rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 2rem;
  }
  @media (min-width: 960px) {
    padding: 2rem 10rem;
  }
`
export const StyledHeadline = styled.h1`
  font-size: 2rem;
  text-align: center;
`
export const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
`

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
     font-size: calc(16px + (24 - 16) * ((100vw - 320px) / (1440 - 320)));
  }
`
