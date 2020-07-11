import axios from 'axios'

const SET_RECIPE_DETAILS = 'SET_RECIPE_DETAILS'
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE'
const EDIT_RECIPE_DETAILS = 'EDIT_RECIPE_DETAILS'
const DELETE_RECIPE = 'DELETE_RECIPE'

export const setRecipeDetails = recipe => {
  return {
    type: SET_RECIPE_DETAILS,
    recipe
  }
}

export const addNewRecipe = recipe => {
  return {
    type: ADD_NEW_RECIPE,
    recipe
  }
}

export const editRecipeDetails = recipe => {
  return {
    type: EDIT_RECIPE_DETAILS,
    recipe
  }
}

export const deleteRecipe = recipe => {
  return {
    type: DELETE_RECIPE,
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

export const addRecipe = recipe => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/recipes', recipe)
      dispatch(addNewRecipe(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const editRecipe = recipe => {
  return async dispatch => {
    try {
      const response = await axios.put('/api/recipes', recipe)
      dispatch(editRecipeDetails(response.data[1][0]))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteRecipeThunk = recipeId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/recipes/${recipeId}`)
      dispatch(deleteRecipe(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

const recipesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_RECIPE_DETAILS:
      return action.recipe
    case ADD_NEW_RECIPE:
      return action.recipe
    case EDIT_RECIPE_DETAILS:
      return action.recipe
    case DELETE_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default recipesReducer
