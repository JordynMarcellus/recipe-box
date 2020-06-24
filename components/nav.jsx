import React, { memo } from "react"
import Router from "next/router"
import styled from "styled-components"
import { StyledButton } from "../styles/index"
import { Header } from "./header"

const StyledNav = styled.nav`
  display: flex;
  background-color: #c8d6e5;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
  align-items: center;
  padding-left: 1rem;
`
const StyledFlexContainer = styled.div`
  flex-grow: 1;
  text-align: center;
`

export const Nav = ({ children }) => {
  return (
    <StyledNav>
      <StyledButton onClick={Router.back}>Back</StyledButton>
      <StyledFlexContainer>{children}</StyledFlexContainer>
    </StyledNav>
  )
}
