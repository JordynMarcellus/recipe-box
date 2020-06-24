import React, { memo } from "react"
import Head from "next/head"
import { Nav } from "./nav"
import { Header } from "./header"

export const Layout = memo(({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav>
      <Header title={title} />
    </Nav>
    <main>{children}</main>
  </>
))
