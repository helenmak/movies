import React from 'react'
import {connect} from 'react-redux'
import {branch, renderComponent} from 'recompose'

import { Card, Layout, Row, Col } from 'antd'
import * as actions from '../../actions'
import Preloader from '../Preloader'

const Content = Layout.Content

const NoContent = props => <h1>Sorry, no movie {props.movie}</h1>

class MovieCard extends React.Component {
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
                    <h1>{this.props.movie.get('title')}</h1>
                  </Row>

                  <Row>
                    <span>Genre: {this.props.movie.get('genres') ? this.props.movie.get('genres').map(genre=>genre.get('name')).join(', ') : 'unknown'}</span>
                  </Row>

                  <Row>
                    <p>{this.props.movie.get('overview')}</p>
                  </Row>

                  <Row justify='center'>
                    <p>Budget: {this.props.movie.get('budget')}</p>
                  </Row>
                  <Row justify='center'>
                    <p>Release: {this.props.movie.get('release_date')}</p>
                  </Row>

                  <Row justify='center'>
                    <span>Popularity: {this.props.movie.get('popularity')}</span>
                  </Row>
                  <Row justify='center'>
                    <p>Average vote: {this.props.movie.get('vote_average')}</p>
                  </Row>
                  <Row justify='center'>
                    <p>Votes: {this.props.movie.get('vote_count')}</p>
                  </Row>

                </Col>

                <Col xs={24} lg={8}>
                  <img src={`${imageApi}/w300/${this.props.movie.get('poster_path')}`} alt="no poster"/>
                </Col>

              </Row>

            </Card>
          </Row>
        </Content>
      </Layout>
    )
  }
}

class MoviePage extends React.Component {
  componentDidMount(){
    console.log('didMount')
    this.props.fetchCurrentMovie(this.props.match.params.id)
  }

  componentWillUnmount(){
    this.props.clearCurrentMovie()
  }

  render () {
    return <DelayedMovieCard {...this.props}/>
  }
}

const DelayedMovieCard = branch(
  props => !props.movie || !props.movie.get('id'),
  renderComponent(Preloader)
)(MovieCard)


const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentMovie: id => dispatch(actions.fetchCurrentMovie(id)),
    clearCurrentMovie: () => dispatch(actions.clearCurrentMovie()),
  }
}

const mapStateToProps = state => {
  return {
    movie: state.get('currentMovie')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)
