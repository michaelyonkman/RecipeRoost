import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {editShoppingListIngredients} from '../store/user'

class ShoppingList extends React.Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      indicesToRemove: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.emailList = this.emailList.bind(this)
  }
  componentDidMount() {
    if (this.props.ingredients) {
      const splitIngredients = this.props.ingredients
        .split(/\r?\n/)
        .filter(ingredient => ingredient !== '')
      this.setState({ingredients: splitIngredients})
    }
  }
  render() {
    if (this.props.ingredients) {
      return (
        <div className="shoppingList">
          <div id="print">
            <div className="headline-container">
              <h2>Shopping List</h2>
            </div>
            <form>
              {this.state.ingredients.map((ingredient, index) => {
                return (
                  <div className="list-item" key={index + ingredient}>
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
            </form>
          </div>
          <div className="editButtonContainer">
            <Button
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
              Update Shopping List
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
              Print Shopping List
            </Button>
            <Button
              onClick={() => this.emailList()}
              style={{
                backgroundColor: '#3c4f76',
                width: '50%',
                marginTop: '1rem',
                marginBottom: '4rem',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Email Shopping List
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="emptyShoppingList">
          <p>Your shopping list is empty</p>
        </div>
      )
    }
  }
  handleChange(event) {
    event.persist()
    this.setState(prevState => {
      if (!prevState.indicesToRemove.includes(Number(event.target.value))) {
        return {
          indicesToRemove: [
            ...prevState.indicesToRemove,
            Number(event.target.value)
          ]
        }
      } else {
        let indexToSplice = prevState.indicesToRemove.indexOf(
          Number(event.target.value)
        )
        let copyToSplice = [...prevState.indicesToRemove]
        copyToSplice.splice(indexToSplice, 1)
        return {
          indicesToRemove: copyToSplice
        }
      }
    })
  }
  handleSubmit() {
    const sortedIndices = this.state.indicesToRemove.sort((a, b) => {
      return b - a
    })
    // eslint-disable-next-line react/no-access-state-in-setstate
    let splicedState = [...this.state.ingredients]
    for (let i = 0; i < sortedIndices.length; i++) {
      let currIdx = sortedIndices[i]
      splicedState.splice(currIdx, 1)
    }
    this.setState({ingredients: splicedState, indicesToRemove: []})
    const joinedState = splicedState.join('\r\n')
    this.props.editShoppingList({
      ingredients: joinedState,
      userId: this.props.userId
    })
  }
  emailList() {
    let link =
      'mailto:?' +
      '&subject=My Shopping List From Recipe Roost!' +
      '&body=' +
      'Shopping List: %0D%0A %0D%0A' +
      encodeURI(this.props.ingredients)

    window.location.href = link
  }
}

const mapState = state => {
  return {
    ingredients: state.user.shoppingList,
    userId: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    editShoppingList: ingredients =>
      dispatch(editShoppingListIngredients(ingredients))
  }
}

export default connect(mapState, mapDispatch)(ShoppingList)
