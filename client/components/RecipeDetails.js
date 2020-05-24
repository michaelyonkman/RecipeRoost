import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRecipeDetails} from '../store/recipes'
import Button from 'react-bootstrap/Button'

class RecipeDetails extends React.Component {
  componentDidMount() {
    this.props.fetchRecipeDetails(this.props.match.params.recipeId)
  }

  render() {
    const recipe = this.props.recipeDetails

    return (
      <div className="recipeDetails">
        <h3>{recipe.name}</h3>
        <img src={recipe.imageURL} />
        <p>{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
        <p>{recipe.rating} Forks</p>
        <div className="editButtonContainer">
          <Button
            href={`/recipes/edit/${recipe.id}`}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Edit Recipe
          </Button>
        </div>
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
