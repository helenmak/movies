import React from 'react'
import {connect} from 'react-redux'

import { List, Avatar, Icon } from 'antd'
import * as actions from '../../actions'

class MoviesCards extends React.Component {
  state = {
    currentPage: 1,
    totalResults: 0
  }

  static getDerivedStateFromProps (nextProps) {
    return {
      currentPage: nextProps.currentPage,
      totalResults: nextProps.totalResults
    }
  }

  handlePaginationChange = page => {
    const config = {
      page,
      query: this.props.query
    }
    this.props.fetchMovies(config)
  }


  render () {
    const IconText = ({ type, text }) => (
      <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    )

    const pagination = {
      pageSize: 20,
      current: this.state.currentPage,
      total: this.state.totalResults,
      onChange: this.handlePaginationChange
    }

    const imageApi = 'https://image.tmdb.org/t/p/'

    return <List
      itemLayout="vertical"
      size="large"
      pagination={pagination}
      dataSource={this.props.movies || []}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.vote_average} />, <IconText type="like-o" text={item.popularity}/>, <IconText type="calendar" text={item.release_date} />]}
          extra={<img width={272} alt="logo" src={`${imageApi}/w300/${item.poster_path}`} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={`${imageApi}/w300/${item.poster_path}`} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.overview}
        </List.Item>
      )}
    />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.results,
    query: state.movies.query,
    currentPage: state.movies.page,
    totalResults: state.movies.total_results,
    totalPages: state.movies.total_pages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCards)
