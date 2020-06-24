import Head from "next/head"

import { Layout } from "../components/layout"
import { Card } from "../components/card.jsx"
import { StyledHeadline, StyledGridContainer } from "../styles"

export default function Home({ allCategories }) {
  return (
    <Layout title="Recipe Box">
      <StyledHeadline>Recipe Box</StyledHeadline>
      <StyledGridContainer>
        {allCategories.map((category) => (
          <Card
            key={category.title}
            {...category}
            linkProps={{
              as: `/recipes/${category.title.toLowerCase()}`,
              href: `/recipes/[id]`,
              description: `Get recipes for ${category.title}`,
            }}
          />
        ))}
      </StyledGridContainer>
    </Layout>
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
