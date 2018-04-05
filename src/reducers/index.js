
import { combineReducers } from 'redux-immutable'

import movies from './movies'
import currentMovie from './movie'
import genres from './genres'

const reducers = combineReducers({
  movies,
  genres,
  currentMovie
});

export default reducers;
