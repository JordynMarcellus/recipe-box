import React from "react"
import Head from "next/head"
import Link from "next/link"

export default function RecipeCategoryPage({ meal }) {
  return (
    <div>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} />
      {/* @TODO make this render in an ordered list*/}
      <p>{meal.strInstructions}</p>
    </div>
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

  const mappedCategories = await Promise.all(
    categories.map(async (category) => {
      const { meals } = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory.toLowerCase()}`
      )
        .then((res) => res.json())
        .catch((e) => console.error(e))
      return meals.map((meal) => ({
        params: {
          recipeId: meal.idMeal,
          id: category.strCategory.toLowerCase(),
        },
      }))
    })
  )

  const paths = mappedCategories.flat()

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { recipeId } = params

  const url = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`

  const { meals } = await fetch(url).then((res) => res.json())

  const [meal] = meals

  return {
    props: { meal },
  }
}
