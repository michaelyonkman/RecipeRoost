import axios from 'axios'

const SET_RECIPE_DETAILS = 'SET_RECIPE_DETAILS'

export const setRecipeDetails = recipe => {
  return {
    type: SET_RECIPE_DETAILS,
    recipe
  }
}

export const fetchRecipeDetails = recipeId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/recipes/${recipeId}`)
      dispatch(setRecipeDetails(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

const recipeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_RECIPE_DETAILS:
      return action.recipe
    default:
      return state
  }
}

export default recipeDetailsReducer
