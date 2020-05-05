import React from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'

export default class AddRecipe extends React.Component {
  render() {
    return (
      <div className="form-container">
        {/* <Form>
          <Form.Group controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control as="textarea" rows="1" />
          </Form.Group>
          <Form.Group controlId="ingredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Form.Group controlId="Instructions">
            <Form.Label>Instructions</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select">
              <option>Starter</option>
              <option>Main Course</option>
              <option>Dessert</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select">
              <option>1 Fork</option>
              <option>2 Forks</option>
              <option>3 Forks</option>
              <option>4 Forks</option>
              <option>5 Forks</option>
            </Form.Control>
          </Form.Group>
          <Form.File id="custom-file" label="Image" custom />
        </Form> */}
        <form>
          <label htmlFor="recipeName">Recipe Name</label>
          <input name="recipeName" type="text" />
          <label htmlFor="ingredients">Ingredients</label>
          <textarea />
          <label htmlFor="instructions">Instructions</label>
          <textarea />
          <label htmlFor="category">Category</label>
          <select>
            <option value="mainCourse">Main Course</option>
            <option value="starter">Starter</option>
            <option value="dessert">Dessert</option>
          </select>
          <label htmlFor="rating">Rating</label>
          <select>
            <option value="1">1 Fork</option>
            <option value="2">2 Forks</option>
            <option value="3">3 Forks</option>
            <option value="4">4 Forks</option>
            <option value="5">5 Forks</option>
          </select>
          <label htmlFor="imageURL">Image</label>
          <input type="file" />
        </form>
      </div>
    )
  }
}
