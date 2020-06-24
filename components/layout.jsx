import React, { memo } from "react"
import Head from "next/head"
import { Nav } from "./nav"
import { Header } from "./header"
import { GlobalStyles } from "../styles/index"

export const Layout = memo(({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalStyles />
    <Nav>
      <Header title={title} />
    </Nav>
    <main>{children}</main>
  </>
))
