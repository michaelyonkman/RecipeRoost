import React from 'react'
import {connect} from 'react-redux'
import {addRecipe} from '../store/recipes'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import history from '../history'

class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipeName: '',
      ingredients: '',
      instructions: '',
      category: '',
      rating: ''
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
              defaultValue="default"
              onChange={this.handleChange}
              style={{
                fontFamily: 'Rock Salt, cursive',
                width: '50%'
              }}
            >
              <option value="default" disabled>
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
              defaultValue="default"
              onChange={this.handleChange}
              style={{
                fontFamily: 'Rock Salt, cursive',
                width: '50%'
              }}
            >
              <option value="default" disabled>
                Rating
              </option>
              <option value="1 fork">1 Fork</option>
              <option value="2 forks">2 Forks</option>
              <option value="3 forks">3 Forks</option>
              <option value="4 forks">4 Forks</option>
              <option value="5 forks">5 Forks</option>
            </Form.Control>
          </Form.Group>
          {/* <Form.File
            id="custom-file"
            label="Image"
            style={{width: '50%', marginTop: '1rem', marginBotton: '2rem'}}
            custom
          /> */}
        </Form>

        <div className="editButtonContainer">
          <Button
            type="submit"
            onClick={this.handleSubmit}
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
        </div>
      </div>
    )
  }
  async handleSubmit(event) {
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
    await this.props.addRecipe(recipeToAdd)
    history.push('/home')
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
