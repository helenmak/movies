import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'

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

  handleMovieCardClick = movieId => {
    this.props.fetchCurrentMovie(movieId)
    this.props.history.push(`movies/${movieId}`)
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
      renderItem={movie => (
        <List.Item
          key={movie.title}
          actions={[<IconText type="star-o" text={movie.vote_average} />, <IconText type="like-o" text={movie.popularity}/>, <IconText type="calendar" text={movie.release_date} />]}
          extra={<img alt="no poster" src={`${imageApi}/w154/${movie.poster_path}`} />}
          onClick ={()=>this.handleMovieCardClick(movie.id)}
        >
          <List.Item.Meta
            title={movie.title}
            description={movie.adult && '18+'}
          />
          {movie.overview}
        </List.Item>
      )}
    />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query)),
    fetchCurrentMovie: id => dispatch(actions.fetchCurrentMovie(id))
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
