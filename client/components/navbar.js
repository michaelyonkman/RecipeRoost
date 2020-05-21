import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {FaFeatherAlt} from 'react-icons/fa'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navContainer">
    <div className="logoContainer">
      <h1 className="logo">
        Recipe <FaFeatherAlt style={{color: '#ff6700', marginRight: '10px'}} />
        {'  '}
        Roost
      </h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div className="navLinks">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/addRecipe">Add Recipe</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navLinks">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
