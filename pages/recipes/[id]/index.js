import React from "react"
import Head from "next/head"
import Link from "next/link"

export default function RecipeCategoryPage({ recipes, title }) {
  return (
    <div>
      <span> Recipes for {title} </span>
      {recipes.map((recipe) => (
        <div key={recipe.strMeal}>
          <img src={recipe.strMealThumb} />
          <Link
            href={`/recipes/[id]/[recipeId]`}
            as={`/recipes/${title}/${recipe.idMeal}`}
          >
            <a>{recipe.strMeal}</a>
          </Link>
        </div>
      ))}
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
  console.log(meals)
  return {
    props: { recipes: meals, title: params.id },
  }
}
