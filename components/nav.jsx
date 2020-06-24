import React, { memo } from "react"
import Router from "next/router"
import styled from "styled-components"

import { Header } from "./header"

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #c8d6e5;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
`

export const Nav = ({ children }) => {
  return (
    <StyledNav>
      <button onClick={Router.back}>Back</button>
      {children}
    </StyledNav>
  )
}
