import React from 'react'
import {connect} from 'react-redux'
import * as actions from "../../actions";

class MainPage extends React.Component{
  state = {}

  componentDidMount() {
    this.props.fetchGenres()
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGenres: () => dispatch(actions.fetchGenres())
  }
}

export default connect(null, mapDispatchToProps)(MainPage)
