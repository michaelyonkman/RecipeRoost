import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllRecipes from './AllRecipes'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3 className="welcome">Welcome, {email}</h3>
      <AllRecipes />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
