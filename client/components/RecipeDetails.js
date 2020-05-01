import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipeDetails} from '../store/recipeDetails'

export class RecipeDetails extends React.Component {
  componentDidMount() {
    this.props.fetchRecipeDetails(this.props.match.params.recipeId)
  }

  render() {
    const recipe = this.props.recipeDetails

    return (
      <div>
        <h3>{recipe.name}</h3>
        <img src={recipe.imageURL} />
        <p>{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
        <p>{recipe.rating}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    recipeDetails: state.recipeDetails
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecipeDetails: recipeId => dispatch(fetchRecipeDetails(recipeId))
  }
}

export default connect(mapState, mapDispatch)(RecipeDetails)
