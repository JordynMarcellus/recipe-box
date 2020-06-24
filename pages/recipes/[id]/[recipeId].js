import React from "react"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"

import { StyledHeadline } from "../../../styles"
import { Layout } from "../../../components/layout"

// Not all recipes use new-line/returns. we can only do so much with this data given time constraints
const renderMealInstructionsToListItems = (instructionsString) => {
  const splitString = instructionsString.split("\r\n")
  return (
    <ol>
      {splitString.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ol>
  )
}

export const StyledRecipeWrapper = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  margin: 0 auto;
`
export const StyledTextWrapper = styled.div`
  padding: 2rem;
`

export const StyledIngredientListItem = styled.li`
  text-transform: lowercase;
`
// we can probably just turn this into a shared styled component in /styles and share b/w card
export const StyledImg = styled.img`
  width: 100%;
`

export default function RecipeCategoryPage({ meal, ingredients }) {
  return (
    <Layout title={`Recipe Box -- ${meal.strMeal}`}>
      <StyledRecipeWrapper>
        <StyledImg src={meal.strMealThumb} alt="" />
        <StyledTextWrapper>
          <h2> Ingredients </h2>
          <ul>
            {ingredients.map((ingredientStep, index) => (
              <StyledIngredientListItem
                key={`${ingredientStep.ingredient}--${index}`}
              >
                {ingredientStep.measurement}{" "}
                {ingredientStep.ingredient.toLowerCase()}
              </StyledIngredientListItem>
            ))}
          </ul>
          <h2>Instructions</h2>
          {renderMealInstructionsToListItems(meal.strInstructions)}
        </StyledTextWrapper>
      </StyledRecipeWrapper>
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

  const ingredients = Object.keys(meal)
    // 🤯 -- values are null and empty string so they're falsey values. we can just do a general falsiness check to clear out the junk.

    .filter((element) => meal[element])
    .reduce((arrayOfMeasurementsAndIngredients, currentObjectKey) => {
      if (/str(Ingredient)/.test(currentObjectKey)) {
        const [ingredientKeyNumber] = currentObjectKey.match(/\d+/)
        return arrayOfMeasurementsAndIngredients.concat({
          ingredient: meal[currentObjectKey],
          measurement: meal[`strMeasure${ingredientKeyNumber}`],
        })
      }
      return arrayOfMeasurementsAndIngredients
    }, [])
  console.log(meal, ingredients)
  return {
    props: { meal, ingredients },
  }
}
