import React from 'react'
import {connect} from 'react-redux'

import { Input } from 'antd'
import * as actions from '../../actions'

const Search = Input.Search

class SearchSection extends React.Component {
  fetchMovies = (query) => {
    this.props.setQuery(query)
    this.props.fetchMovies({query})
  }

  render () {
    return <Search
      placeholder="search here..."
      onSearch={this.fetchMovies}
      style={{ width: 400 }}
      enterButton="Search"
      size="large"
    />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: config => dispatch(actions.fetchMovies(config)),
    setQuery: query => dispatch(actions.setQuery(query))
  }
}

export default connect(null, mapDispatchToProps)(SearchSection)
