import React from 'react'
import Button from 'react-bootstrap/Button'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {addRecipe} from '../store/recipes'
import history from '../history'

const initialValues = {
  recipeName: '',
  ingredients: '',
  instructions: '',
  category: '',
  rating: '',
  userId: null
}

let sendRecipe

async function onSubmit(values) {
  await sendRecipe(values)
  history.push('/home')
}

const validationSchema = Yup.object({
  recipeName: Yup.string().required('This field is required'),
  ingredients: Yup.string().required('This field is required'),
  instructions: Yup.string().required('This field is required'),
  category: Yup.string().required('This field is required'),
  rating: Yup.string().required('This field is required')
})

export class RecipeForm extends React.Component {
  render() {
    initialValues.userId = this.props.user.id
    sendRecipe = this.props.addRecipe
    console.log(initialValues.userId)
    return (
      <div className="recipeFormContainer">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="input-container">
              <label htmlFor="recipeName">Recipe Name</label>
              <Field type="text" id="recipeName" name="recipeName" />
              <div className="error">
                <ErrorMessage name="recipeName" />
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="ingredients">Ingredients</label>
              <Field as="textarea" id="ingredients" name="ingredients" />
              <div className="error">
                <ErrorMessage name="ingredients" />
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="instructions">Instructions</label>
              <Field as="textarea" id="instructions" name="instructions" />
              <div className="error">
                <ErrorMessage name="instructions" />
              </div>
            </div>

            <div className="input-container">
              <Field
                as="select"
                id="category"
                name="category"
                className="form-control"
              >
                <option defaultValue>Category</option>
                <option value="main course">Main Course</option>
                <option value="starter">Starter</option>
                <option value="dessert">Dessert</option>
              </Field>
              <div className="error">
                <ErrorMessage name="category" />
              </div>
            </div>

            <div className="input-container">
              <Field
                as="select"
                id="rating"
                name="rating"
                className="form-control"
              >
                <option defaultValue>Rating</option>
                <option value="1">1 Feather</option>
                <option value="2">2 Feathers</option>
                <option value="3">3 Feathers</option>
                <option value="4">4 Feathers</option>
                <option value="5">5 Feathers</option>
              </Field>
              <div className="error">
                <ErrorMessage name="rating" />
              </div>
            </div>

            <div className="editButtonContainer">
              <Button
                type="submit"
                style={{
                  backgroundColor: '#3c4f76',
                  width: '50%',
                  marginTop: '1rem',
                  marginBottom: '4rem',
                  fontFamily: 'Rock Salt, cursive',
                  borderStyle: 'none'
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addRecipe: recipeToAdd => dispatch(addRecipe(recipeToAdd))
  }
}

export default connect(mapState, mapDispatch)(RecipeForm)
