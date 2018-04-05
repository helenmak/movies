import React from 'react'
import {connect} from 'react-redux'
import {branch, renderComponent} from 'recompose'

import { Card, Layout, Row, Col } from 'antd'
import * as actions from '../../actions'

const Page = props => {
  return <div> {props.children} </div>
}

const Content = Layout.Content

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


  render () {
    const imageApi = 'https://image.tmdb.org/t/p/'

    return(
      <Layout>
        <Content style={{ background: '#fff' }} >
          <Row justify='center'>
            <Card bordered={false} style={{ width: '80%' }}>
              <Row justify='center'>

                <Col xs={24} lg={16}>

                  <Row justify='center'>
                    <h1>{this.props.movie.title}</h1>
                  </Row>

                  <Row>
                    <span>Genre: {this.props.movie.genres ? this.props.movie.genres.map(genre=>genre.name).join(', ') : 'unknown'}</span>
                  </Row>

                  <Row>
                    <p>{this.props.movie.overview}</p>
                  </Row>

                  <Row justify='center'>
                    <p>Budget: {this.props.movie.budget}</p>
                  </Row>
                  <Row justify='center'>
                    <p>Release: {this.props.movie.release_date}</p>
                  </Row>

                  <Row justify='center'>
                    <span>Popularity: {this.props.movie.popularity}</span>
                  </Row>
                  <Row justify='center'>
                    <p>Average vote: {this.props.movie.vote_average}</p>
                  </Row>
                  <Row justify='center'>
                    <p>Votes: {this.props.movie.vote_count}</p>
                  </Row>

                </Col>

                <Col xs={24} lg={8}>
                  <img src={`${imageApi}/w300/${this.props.movie.poster_path}`} alt="no poster"/>
                </Col>

              </Row>

            </Card>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

const mapStateToProps = state => {
  return {
    movie: state.currentMovie
  }
}

const NoContent = props => <h3>Sorry, no movie</h3>

const DelayedMoviePage = branch(
  props => !props.movie, //TODO: loading + spinner
  renderComponent(NoContent)
)(MoviePage)

export default connect(mapStateToProps, mapDispatchToProps)(DelayedMoviePage)
