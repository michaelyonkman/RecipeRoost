import React from 'react'
import {connect} from 'react-redux'
import {addRecipe} from '../store/recipeDetails'

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
        <label htmlFor="category">Category</label>
        <select name="category">
          <option value="mainCourse">Main Course</option>
          <option value="starter">Starter</option>
          <option value="dessert">Dessert</option>
        </select>
        <label htmlFor="rating">Rating</label>
        <select name="rating">
          <option value="1">1 Fork</option>
          <option value="2">2 Forks</option>
          <option value="3">3 Forks</option>
          <option value="4">4 Forks</option>
          <option value="5">5 Forks</option>
        </select>
        <label htmlFor="imageURL">Image</label>
        <input type="file" />
        <button type="submit">Submit</button>
      </form>
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
