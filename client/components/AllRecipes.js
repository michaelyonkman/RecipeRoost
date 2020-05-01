import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/userRecipes'

export class AllRecipes extends React.Component {
  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    const recipes = this.props.userRecipes

    return (
      <div>
        {recipes.length &&
          recipes.map(recipe => {
            return (
              <div key={recipe.id}>
                <Link to={`recipes/${recipe.id}`}>
                  <h3>{recipe.name}</h3>
                  <img src={recipe.imageURL} />
                  <p>{recipe.ingredients}</p>
                  <p>{recipe.instructions}</p>
                  <p>{recipe.rating}</p>
                </Link>
              </div>
            )
          })}
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
