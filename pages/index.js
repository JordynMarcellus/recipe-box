import { Grommet, Box } from "grommet"
import Head from "next/head"

import { Card } from "../components/card.jsx"
import { StyledHeadline, StyledGridContainer } from "../styles"

export default function Home({ allCategories }) {
  return (
    <Grommet plain>
      <Head>
        <title>Recipe Box 😋</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StyledHeadline>Recipe Box</StyledHeadline>
        <StyledGridContainer>
          {allCategories.map((category) => (
            <Card
              key={category.title}
              {...category}
              linkProps={{
                as: `/recipes/${props.title.toLowerCase()}`,
                href: `/recipes/[id]`,
                description: `Get recipes for ${category.title}`,
              }}
            />
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
