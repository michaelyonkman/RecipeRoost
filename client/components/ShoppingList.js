import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class ShoppingList extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      indicesToRemove: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({ingredients: this.props.ingredients.split(/\r?\n/)})
  }

  render() {
    // let ingredients = this.props.ingredients.split(/\r?\n/)
    return (
      <div className="shoppingList">
        {/* <Form>
          {this.state.ingredients.map((ingredient, index) => {
            return (
              <div key={ingredient} className="mb-3">
                <Form.Check
                  type="checkbox"
                  value={index}
                  id="default-checkbox"
                  label={ingredient}
                />
              </div>
            )
          })}
        </Form> */}
        <form>
          {this.state.ingredients.map((ingredient, index) => {
            return (
              <div key={ingredient}>
                <label>
                  <input
                    type="checkbox"
                    name="indicesToRemove"
                    value={index}
                    label={ingredient}
                    onChange={this.handleChange}
                  />
                  {ingredient}
                </label>
              </div>
            )
          })}
          <Button
            onClick={this.handleSubmit}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginBottom: '2rem',
              marginTop: '2rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Update Shopping List
          </Button>
        </form>
      </div>
    )
  }
  handleChange(event) {
    event.persist()
    this.setState(prevState => {
      return {
        indicesToRemove: [
          ...prevState.indicesToRemove,
          Number(event.target.value)
        ]
      }
    })
    // console.log(this.state)
  }
  handleSubmit() {
    console.log('HANDLE SUBMIT', this.state)
    const sortedIndices = this.state.indicesToRemove.sort((a, b) => {
      return b - a
    })
    let splicedState = [...this.state.ingredients]
    for (let i = 0; i < sortedIndices.length; i++) {
      console.log('IN LOOP')
      let currIdx = sortedIndices[i]
      splicedState.splice(currIdx, 1)
    }
    this.setState({ingredients: splicedState, indicesToRemove: []})
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
