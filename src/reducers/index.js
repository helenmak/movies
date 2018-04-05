import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'

import movies from './movies'
import currentMovie from './movie'
import genres from './genres'
import preloaderReducer from "./preloader";

const reducers = combineReducers({
  movies,
  genres,
  currentMovie,
  preloaderReducer,
  router: routerReducer
})

export default reducers;
