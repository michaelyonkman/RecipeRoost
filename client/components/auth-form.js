import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Button from 'react-bootstrap/Button'

let outsideError
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const [errorMessage, setErrorMessage] = useState('')
  outsideError = setErrorMessage
  return (
    <div className="auth-page-container">
      <div className="intro">
        <div className="introText">
          <p>
            <span className="highlight">
              Recipe Roost is the online home for all of your best-loved
              recipes.
            </span>{' '}
            Once you create an account, you can add recipes from any source with
            some simple copy and paste. Now that you're up and running with some
            recipes in your box, you can access them from anywhere on your PC or
            mobile device. It's that simple. What are you waiting for?{' '}
            <span className="highlight">Join now!</span>
          </p>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit} name={name}>
          <div className="inputContainer">
            <input name="email" type="text" placeholder="&#xf007;" />
          </div>
          <div className="inputContainer">
            <input name="password" type="password" placeholder="&#xf023;" />
          </div>
          <Button
            type="submit"
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '1rem',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            {displayName}
          </Button>
          {/* <p>OR</p> */}
          {error && error.response && (
            <div className="user-error"> {error.response.data} </div>
          )}
          <div className="user-error">{errorMessage}</div>
          {/* <Button
            href="/auth/google"
            style={{
              backgroundColor: '#3c4f76',
              width: '50%',
              marginTop: '10px',
              fontFamily: 'Rock Salt, cursive',
              borderStyle: 'none'
            }}
          >
            {displayName} with Google
          </Button> */}
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (email && password) {
        dispatch(auth(email, password, formName))
      } else {
        outsideError('Both username and password are required')
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
