import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/userRecipes'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

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
          {recipes.length &&
            recipes.map(recipe => {
              return (
                <div key={recipe.id}>
                  <Card
                    style={{
                      width: '18rem',
                      flex: 1,
                      margin: 'auto',
                      marginTop: '1rem',
                      marginBottom: '1rem'
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
            })}
        </CardDeck>
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
