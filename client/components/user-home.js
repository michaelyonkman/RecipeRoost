import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  // componentDidMount() {
  //   this.props.getRecipes()
  // }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
      </div>
    )
  }
}
// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}
// const mapDispatch = dispatch => {
//   return {
//     getRecipes: () => dispatch(getRecipes())
//   }
// }

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
