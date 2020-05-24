import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/userRecipes'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

export class AllRecipes extends React.Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      isSearching: false,
      searchVal: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    let recipes
    if (this.state.isSearching) {
      recipes = this.state.recipes
    } else {
      recipes = this.props.userRecipes
    }

    return (
      <div>
        <div className="recipeFormContainer">
          <form onChange={this.handleChange}>
            <input
              name="searchVal"
              type="text"
              placeholder="Search by name, ingredient, or category "
            />
          </form>
          <div className="addRecipeButtonContainer">
            <Button
              type="submit"
              onClick={this.handleSubmit}
              style={{
                backgroundColor: '#3c4f76',
                width: '50%',
                marginTop: '1rem',
                marginBottom: '1rem',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Search
            </Button>

            <Button
              href="/addRecipe"
              style={{
                backgroundColor: '#3c4f76',
                width: '50%',
                marginTop: '1rem',
                marginBottom: '2rem',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Add Recipe
            </Button>
          </div>
        </div>
        <CardDeck
          style={{
            justifyContent: 'space-evenly'
          }}
        >
          {recipes.length ? (
            recipes.map(recipe => {
              return (
                <div key={recipe.id}>
                  <Card
                    className="text-center"
                    style={{
                      width: '18rem',
                      flex: 1,
                      margin: 'auto',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      fontFamily: 'Rock Salt, cursive'
                    }}
                  >
                    <Card.Img variant="top" src={recipe.imageURL} />
                    <Link to={`recipes/${recipe.id}`}>
                      <Card.Title>{recipe.name}</Card.Title>
                    </Link>
                    {/* <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                    <p>{recipe.rating}</p> */}
                  </Card>
                </div>
              )
            })
          ) : (
            <div className="emptyMessage">
              <p>No recipes found</p>
            </div>
          )}
        </CardDeck>
      </div>
    )
  }
  filterRecipes(searchVal) {
    const filteredRecipes = this.props.userRecipes.filter(
      recipe =>
        recipe.ingredients.toLowerCase().includes(searchVal.toLowerCase()) ||
        recipe.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchVal.toLowerCase())
    )
    return filteredRecipes
  }
  handleSubmit() {
    const searchVal = this.state.searchVal
    this.setState({
      recipes: this.filterRecipes(searchVal),
      isSearching: true
    })
    console.log(this.state)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('IN CHANGE', this.props.userRecipes)
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    userRecipes: state.userRecipes
  }
}
const mapDispatch = dispatch => {
  return {
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapState, mapDispatch)(AllRecipes)
