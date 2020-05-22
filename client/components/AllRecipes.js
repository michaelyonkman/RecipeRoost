import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/userRecipes'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

export class AllRecipes extends React.Component {
  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    const recipes = this.props.userRecipes

    return (
      <div>
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
              <p>Your recipe box is empty.</p>
            </div>
          )}
        </CardDeck>
        <div className="addRecipeButtonContainer">
          <Button
            href="/addRecipe"
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Add Recipe
          </Button>
        </div>
      </div>
    )
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
