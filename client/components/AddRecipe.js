import React from 'react'
import {connect} from 'react-redux'
import {addRecipe} from '../store/recipes'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipeName: '',
      ingredients: '',
      instructions: '',
      category: 'main course',
      rating: '1'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  render() {
    return (
      <div className="recipeFormContainer">
        <form
          onSubmit={this.handleSubmit}
          name={name}
          onChange={this.handleChange}
        >
          <label htmlFor="recipeName">Recipe Name</label>
          <input name="recipeName" type="text" />
          <label htmlFor="ingredients">Ingredients</label>
          <textarea name="ingredients" />
          <label htmlFor="instructions">Instructions</label>
          <textarea name="instructions" />
          {/* <label htmlFor="imageURL">Image</label>
            <input type="file" /> */}
          <Form>
            <Form.Group
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Form.Control
                as="select"
                name="category"
                style={{
                  fontFamily: 'Rock Salt, cursive',
                  width: '50%'
                }}
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="mainCourse">Main Course</option>
                <option value="starter">Starter</option>
                <option value="dessert">Dessert</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Form.Control
                as="select"
                name="rating"
                style={{
                  fontFamily: 'Rock Salt, cursive',
                  width: '50%'
                }}
              >
                <option value="" disabled selected>
                  Rating
                </option>
                <option value="1">1 Fork</option>
                <option value="2">2 Forks</option>
                <option value="3">3 Forks</option>
                <option value="4">4 Forks</option>
                <option value="5">5 Forks</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button
            type="submit"
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    const recipeToAdd = {
      recipeName: this.state.recipeName,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      category: this.state.category,
      rating: this.state.rating,
      userId: this.props.user.id
    }
    console.log(recipeToAdd)
    this.props.addRecipe(recipeToAdd)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addRecipe: (recipeToAdd, userId) => dispatch(addRecipe(recipeToAdd, userId))
  }
}

export default connect(mapState, mapDispatch)(AddRecipe)
