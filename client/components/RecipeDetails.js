import React from 'react'
import {connect} from 'react-redux'
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
        <div id="printRecipe">
          <h3>{recipe.name}</h3>
          {/* <img src={recipe.imageURL} /> */}
          <h5>Ingredients</h5>
          <p>{recipe.ingredients}</p>
          <h5>Instructions</h5>
          <p>{recipe.instructions}</p>
          <h5>Rating</h5>
          <p>{recipe.rating}</p>
        </div>
        <div className="editButtonContainer">
          <Button
            href={`/recipes/edit/${recipe.id}`}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '2rem',
              marginBottom: '1rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Edit Recipe
          </Button>
          <Button
            onClick={() => window.print()}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Print Recipe
          </Button>
          <Button
            onClick={() => this.emailRecipe()}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Email Recipe
          </Button>
        </div>
      </div>
    )
  }
  emailRecipe() {
    let link =
      'mailto:?' +
      '&subject=Check Out This Recipe From Recipe Roost!' +
      '&body=' +
      encodeURI(this.props.recipeDetails.name) +
      '%0D%0A %0D%0A' +
      'Ingredients: %0D%0A %0D%0A' +
      encodeURI(this.props.recipeDetails.ingredients) +
      '%0D%0A %0D%0A' +
      'Instructions: %0D%0A %0D%0A' +
      encodeURI(this.props.recipeDetails.instructions)

    window.location.href = link
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
