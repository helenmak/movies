import React from 'react'
import * as actions from '../../actions'
import {connect} from 'react-redux'

class SearchSection extends React.Component {
  state = {query: ''}

  fetchMovies = () => this.props.fetchMovies(this.state.query)

  handleChange = e => {
    const query = e.target.value
    this.setState({query})
  }

  render () {
    return <input type="search" value={this.state.query} onChange={this.handleChange} onBlur={this.fetchMovies}/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

export default connect(null, mapDispatchToProps)(SearchSection)
