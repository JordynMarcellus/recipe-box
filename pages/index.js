import { Grommet, Box } from "grommet"
import Head from "next/head"
import styled from "styled-components"

import { Card } from "../components/card.jsx"

const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 2rem;
`

export default function Home({ allCategories }) {
  return (
    <Grommet plain>
      <Head>
        <title>Recipe Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1> Recipe Box </h1>
        <StyledGridContainer>
          {allCategories.map((category) => (
            <Card key={category.title} {...category} />
          ))}
        </StyledGridContainer>
      </main>

      <footer></footer>
    </Grommet>
  )
}

export async function getStaticProps() {
  const { categories } = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  )
    .then((res) => {
      return res.json()
    })
    .catch((e) => console.error(e))

  const allCategories = categories.map(
    ({
      idCategory,
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
    }) => ({
      title: strCategory,
      description: strCategoryDescription,
      img: strCategoryThumb,
      id: parseInt(idCategory, 10),
    })
  )

  return { props: { allCategories } }
}
