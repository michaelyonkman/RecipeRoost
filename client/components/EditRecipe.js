import React from 'react'
import {connect} from 'react-redux'
import {
  fetchRecipeDetails,
  editRecipe,
  deleteRecipeThunk
} from '../store/recipes'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import history from '../history'

class EditRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipeName: '',
      ingredients: '',
      instructions: '',
      category: '',
      rating: '',
      show: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchRecipeDetails(this.props.match.params.recipeId)
    this.state.recipeName = this.props.recipeDetails.name
    this.state.ingredients = this.props.recipeDetails.ingredients
    this.state.instructions = this.props.recipeDetails.instructions
    this.state.category = this.props.recipeDetails.category
    this.state.rating = this.props.recipeDetails.rating
    console.log(this.state)
  }
  render() {
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          name={name}
          onChange={this.handleChange}
        >
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            name="recipeName"
            type="text"
            defaultValue={this.props.recipeDetails.name}
          />
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            name="ingredients"
            defaultValue={this.props.recipeDetails.ingredients}
          />
          <label htmlFor="instructions">Instructions</label>
          <textarea
            name="instructions"
            defaultValue={this.props.recipeDetails.instructions}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            defaultValue={this.props.recipeDetails.category}
          >
            <option value="mainCourse">Main Course</option>
            <option value="starter">Starter</option>
            <option value="dessert">Dessert</option>
          </select>
          <label htmlFor="rating">Rating</label>
          <select name="rating" defaultValue={this.props.recipeDetails.rating}>
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
        <Button variant="danger" onClick={this.handleShow}>
          Delete Recipe
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this recipe? This recipe will be
            removed permanently from your recipe box.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Back
            </Button>
            <Button variant="danger" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    const recipeToEdit = {
      recipeName: this.state.recipeName,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      category: this.state.category,
      rating: this.state.rating,
      userId: this.props.user.id,
      recipeId: this.props.recipeDetails.id
    }
    this.props.editRecipe(recipeToEdit)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleDelete() {
    this.props.deleteRecipe(this.props.recipeDetails.id)
    history.push('/home')
  }
  handleClose() {
    this.setState({show: false})
  }
  handleShow() {
    this.setState({show: true})
  }
}

const mapState = state => {
  return {
    user: state.user,
    recipeDetails: state.recipeDetails
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRecipeDetails: recipeId => dispatch(fetchRecipeDetails(recipeId)),
    editRecipe: recipe => dispatch(editRecipe(recipe)),
    deleteRecipe: recipeId => dispatch(deleteRecipeThunk(recipeId))
  }
}

export default connect(mapState, mapDispatch)(EditRecipe)
