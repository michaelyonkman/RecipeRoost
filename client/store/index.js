import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import userRecipesReducer from './userRecipes'
import recipeDetailsReducer from './recipeDetails'

const reducer = combineReducers({
  user,
  userRecipes: userRecipesReducer,
  recipeDetails: recipeDetailsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
