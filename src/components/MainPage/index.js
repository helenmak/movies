import React from 'react'
import {connect} from 'react-redux'
import * as actions from "../../actions"
import SearchSection from '../SearchSection'
import MoviesCards from '../MoviesCards'
import MoviePage from '../MoviePage'
import {Route, Switch} from "react-router-dom"
import {branch, renderComponent} from "recompose"
import NoContent from '../NoContent'

class MainPage extends React.Component{
  state = {}

  componentDidMount() {
    this.props.fetchGenres()
  }

  render () {
    return (
      <div>
        <Switch>
          <Route path="/" exact render = { props =>
            <React.Fragment>
              <SearchSection/>
              <MoviesCards {...props}/>
            </React.Fragment>
          } />
          <Route path="/movies/:id" component = {MoviePage}/>
        </Switch>
      </div>
    )
  }
}

const DelayedMoviesCards = branch(
  props => props.movies,
  renderComponent(NoContent)
)(MoviesCards)

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movies', 'results']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGenres: () => dispatch(actions.fetchGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
