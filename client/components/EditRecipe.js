import React from 'react'
import {connect} from 'react-redux'
import {
  fetchRecipeDetails,
  editRecipe,
  deleteRecipeThunk
} from '../store/recipes'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
    this.goHome = this.goHome.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchRecipeDetails(this.props.match.params.recipeId)
    this.state.recipeName = this.props.recipeDetails.name
    this.state.ingredients = this.props.recipeDetails.ingredients
    this.state.instructions = this.props.recipeDetails.instructions
    this.state.category = this.props.recipeDetails.category
    this.state.rating = this.props.recipeDetails.rating
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
        </form>
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
              defaultValue={this.props.recipeDetails.category}
              onChange={this.handleChange}
              style={{
                fontFamily: 'Rock Salt, cursive',
                width: '50%',
                padding: '0'
              }}
            >
              <option value="" disabled selected>
                Category
              </option>
              <option value="main course">Main Course</option>
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
              defaultValue={this.props.recipeDetails.rating}
              onChange={this.handleChange}
              style={{
                fontFamily: 'Rock Salt, cursive',
                width: '50%',
                padding: '0'
              }}
            >
              <option value="" disabled selected>
                Rating
              </option>
              <option value="1">1 Feather</option>
              <option value="2">2 Feathers</option>
              <option value="3">3 Feathers</option>
              <option value="4">4 Feathers</option>
              <option value="5">5 Feathers</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {/* <label htmlFor="imageURL">Image</label>
          <input type="file" /> */}
        <div className="editButtonContainer">
          <Button
            type="submit"
            onClick={this.handleSubmit}
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '1rem',
              marginBottom: '2rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            Submit
          </Button>
          <div className="deleteButtonContainer">
            <Button
              onClick={this.handleShow}
              style={{
                backgroundColor: '#ff670f',
                width: '50%',
                marginBottom: '4rem',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Delete Recipe
            </Button>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontFamily: 'Rock Salt, cursive'}}>
              Delete Recipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{fontFamily: 'Rock Salt, cursive'}}>
            Are you sure you want to delete this recipe?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.handleClose}
              style={{
                backgroundColor: '#3c4f76',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Back
            </Button>
            <Button
              onClick={this.handleDelete}
              style={{
                backgroundColor: '#ff670f',
                fontFamily: 'Rock Salt, cursive',
                borderStyle: 'none'
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
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
    history.push(`/recipes/${this.props.recipeDetails.id}`)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleDelete() {
    this.props.deleteRecipe(this.props.recipeDetails.id)
    setTimeout(this.goHome, 1000)
  }
  handleClose() {
    this.setState({show: false})
  }
  handleShow() {
    this.setState({show: true})
  }
  goHome() {
    history.push('/home')
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
