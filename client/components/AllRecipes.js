import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/userRecipes'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import history from '../history'

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
    // eslint-disable-next-line no-func-assign
  }
  async componentDidMount() {
    await this.props.getRecipes()
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
          <form className="searchForm" onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              name="searchVal"
              type="text"
              placeholder="Search recipes by name, ingredient, or category "
              value={this.state.searchVal}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: '#3c4f76',
                width: '50%',
                marginTop: '1rem',
                marginBottom: '4rem',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Search Recipes
            </Button>
          </form>
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
                      fontFamily: 'Rock Salt, cursive',
                      backgroundColor: '#cfc7d2',
                      borderRadius: '40px',
                      border: 'solid #ff670f 1px',
                      boxShadow: '5px 10px #ff670f'
                    }}
                  >
                    {/* <Card.Img variant="top" src={recipe.imageURL} /> */}
                    <Link to={`recipes/${recipe.id}`}>
                      <Card.Title style={{marginTop: '1rem'}}>
                        {recipe.name}
                      </Card.Title>
                      <p>{recipe.category}</p>
                      <p>{recipe.rating}</p>
                    </Link>
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
        <div className="addRecipeButtonContainer">
          <Button
            onClick={() => history.push('/addRecipe')}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '4rem',
              marginBottom: '4rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Add New Recipe
          </Button>
        </div>
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

  handleSubmit(e) {
    e.preventDefault()
    const searchVal = this.state.searchVal
    this.setState({
      recipes: this.filterRecipes(searchVal),
      isSearching: true,
      searchVal: ''
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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
