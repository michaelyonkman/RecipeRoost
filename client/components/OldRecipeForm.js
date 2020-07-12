import React from 'react'
import Button from 'react-bootstrap/Button'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const initialValues = {
  recipeName: '',
  ingredients: '',
  instructions: ''
}

const onSubmit = values => {
  //API call here
}
// Custom Formik validation schema without Yup
//
// const validate = values => {
//   let errors = {}
//   if (!values.recipeName) {
//     errors.recipeName = 'This field is required'
//   }
//   if (!values.ingredients) {
//     errors.ingredients = 'This field is required'
//   }
//   if (!values.instructions) {
//     errors.instructions = 'This field is required'
//   }
//   return errors
// }

const validationSchema = Yup.object({
  recipeName: Yup.string().required('Required'),
  ingredients: Yup.string().required('Required'),
  instructions: Yup.string().required('Required')
})

function OldRecipeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate
    validationSchema
  })

  console.log('Values', formik.values)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-container">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            id="recipeName"
            name="recipeName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recipeName}
          />
          <div className="error">
            {formik.touched.recipeName && formik.errors.recipeName
              ? formik.errors.recipeName
              : null}
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ingredients}
          />
          <div className="error">
            {formik.touched.ingredients && formik.errors.ingredients
              ? formik.errors.ingredients
              : null}
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.instructions}
          />
          <div className="error">
            {formik.touched.instructions && formik.errors.instructions
              ? formik.errors.instructions
              : null}
          </div>
        </div>

        <div className="editButtonContainer">
          <Button
            type="submit"
            // onClick={this.handleSubmit}
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
      </form>
    </div>
  )
}

export default OldRecipeForm
