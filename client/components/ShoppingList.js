import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class ShoppingList extends React.Component {
  // componentDidMount() {
  //   this.props.fetchRecipeDetails(this.props.match.params.recipeId)
  // }

  render() {
    let ingredients = this.props.ingredients.split(/\r?\n/)
    return (
      <div className="shoppingList">
        <Form>
          {ingredients.map(ingredient => {
            return (
              <div key={ingredient} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label={ingredient}
                />
              </div>
            )
          })}
        </Form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    ingredients: state.user.shoppingList
  }
}
// const mapDispatch = dispatch => {
//   return {
//     fetchRecipeDetails: recipeId => dispatch(fetchRecipeDetails(recipeId))
//   }
// }

// export default connect(mapState, mapDispatch)(ShoppingList)

export default connect(mapState)(ShoppingList)
