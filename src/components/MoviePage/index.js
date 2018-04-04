import React from 'react'
import {connect} from 'react-redux'
import {branch, renderComponent} from 'recompose'

import { List, Avatar, Icon } from 'antd'
import * as actions from '../../actions'

const Page = props => {
  return <div> {props.children} </div>
}

class MoviePage extends React.Component {
  state = {
    currentMovie: '',
  }

  static getDerivedStateFromProps (nextProps) {
    return {
      currentMovie: nextProps.currentPage,
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
    console.log('eee', movieId)
    
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
            title={this.props.title}
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
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie
  }
}

const NoContent = props => <h3>Sorry, no movie</h3>

const DelayedMoviePage = branch(
  props => !props.movie, //TODO: loading + spinner
  renderComponent(NoContent)
)(MoviePage)

export default connect(mapStateToProps, mapDispatchToProps)(DelayedMoviePage)
