import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipeDetails} from '../store/recipes'
import {editShoppingListIngredients} from '../store/user'
import Button from 'react-bootstrap/Button'
import history from '../history'
import {GiFeather} from 'react-icons/gi'

class RecipeDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      addBtnMessage: 'Add To Shopping List',
      addBtnDisabled: false
    }
    this.rating = this.rating.bind(this)
  }
  componentDidMount() {
    this.props.fetchRecipeDetails(this.props.match.params.recipeId)
  }

  render() {
    const recipe = this.props.recipeDetails
    return (
      <div className="recipeDetails">
        <div id="print">
          <h3>{recipe.name}</h3>
          {/* <img src={recipe.imageURL} /> */}
          <h5>Ingredients</h5>
          <p>{recipe.ingredients}</p>
          <h5>Instructions</h5>
          <p>{recipe.instructions}</p>
          <h5 className="rating">Rating</h5>
          <div className="ratingContainer">
            <p className="rating">{this.rating(recipe.rating)}</p>
          </div>
        </div>
        <div className="editButtonContainer">
          <Button
            onClick={() => history.push(`/recipes/edit/${recipe.id}`)}
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

          <Button
            disabled={this.state.addBtnDisabled}
            onClick={() => {
              this.props.shoppingList
                ? this.props.editShoppingList({
                    ingredients:
                      this.props.shoppingList + '\r\n' + recipe.ingredients,
                    userId: this.props.userId
                  })
                : this.props.editShoppingList({
                    ingredients: recipe.ingredients,
                    userId: this.props.userId
                  })
              this.setState({
                addBtnMessage: 'Added To Shopping List',
                addBtnDisabled: true
              })
            }}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            {this.state.addBtnMessage}
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
  rating(n) {
    let ratingArr = []
    for (let i = 0; i < n; i++) {
      ratingArr.push(
        <GiFeather key={i} style={{color: '#ff6700', fontSize: '3rem'}} />
      )
    }
    return ratingArr
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    shoppingList: state.user.shoppingList,
    recipeDetails: state.recipeDetails
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecipeDetails: recipeId => dispatch(fetchRecipeDetails(recipeId)),
    editShoppingList: ingredients =>
      dispatch(editShoppingListIngredients(ingredients))
  }
}

export default connect(mapState, mapDispatch)(RecipeDetails)
