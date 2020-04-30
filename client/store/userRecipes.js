import axios from 'axios'

const GET_USER_RECIPES = 'GET_USER_RECIPES'

export const getUserRecipes = recipes => {
  return {
    type: GET_USER_RECIPES,
    recipes
  }
}

export const getRecipes = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users/myprofile')
      dispatch(getUserRecipes(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

const userRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default userRecipesReducer
