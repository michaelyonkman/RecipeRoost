import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRecipeDetails} from '../store/recipes'

export class RecipeDetails extends React.Component {
  componentDidMount() {
    console.log(this.props)
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
        <Link to={`/recipes/edit/${recipe.id}`}>Edit Recipe</Link>
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
