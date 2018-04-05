import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { List, Avatar, Icon } from 'antd'
import * as actions from '../../actions'
import {branch, renderComponent} from "recompose";
import Preloader from "../Preloader";

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
      dataSource={this.props.movies ? this.props.movies.toArray() : []}
      renderItem={movie => (
        <List.Item
          key={movie.get('title')}
          actions={[<IconText type="star-o" text={movie.get('vote_average')} />, <IconText type="like-o" text={movie.get('popularity')}/>, <IconText type="calendar" text={movie.get('release_date')} />]}
          extra={<img alt="no poster" src={`${imageApi}/w154/${movie.get('poster_path')}`} />}
          onClick ={()=>this.handleMovieCardClick(movie.get('id'))}
        >
          <List.Item.Meta
            title={movie.get('title')}
            description={movie.get('adult') && '18+'}
          />
          {movie.get('overview')}
        </List.Item>
      )}
    />
  }
}

const DelayedMovieCard = branch(
  props => !props.movie || !props.movie.get('id'),
  renderComponent(Preloader)
)(MovieCard)

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query)),
    fetchCurrentMovie: id => dispatch(actions.fetchCurrentMovie(id))
  }
}

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movies', 'results']),
    query: state.getIn(['movies', 'query']),
    currentPage: state.getIn(['movies', 'page']),
    totalResults: state.getIn(['movies', 'total_results']),
    totalPages: state.getIn(['movies', 'total_pages']),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCards)
