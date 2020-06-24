import React from "react"
import Head from "next/head"
import Link from "next/link"

import { Layout } from "../../../components/layout"
import { Card } from "../../../components/card"
import { StyledHeadline, StyledGridContainer } from "../../../styles"

export default function RecipeCategoryPage({ recipes, title }) {
  return (
    <Layout title={`Recipe box -- ${title} recipes`}>
      <StyledGridContainer>
        {recipes.map((recipe) => (
          <Card
            img={recipe.strMealThumb}
            title={recipe.strMeal}
            key={recipe.strMeal}
            linkProps={{
              href: `/recipes/[id]/[recipeId]`,
              as: `/recipes/${title}/${recipe.idMeal}`,
              description: `Get the recipes for ${recipe.strMeal}`,
            }}
          ></Card>
        ))}
      </StyledGridContainer>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { categories } = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  )
    .then((res) => {
      return res.json()
    })
    .catch((e) => console.error(e))

  const paths = categories.map((category) => ({
    params: {
      id: category.strCategory.toLowerCase(),
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // @TODO util-ify this fetch?
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.id}`

  const { meals } = await fetch(url).then((res) => res.json())
  return {
    props: { recipes: meals, title: params.id },
  }
}
