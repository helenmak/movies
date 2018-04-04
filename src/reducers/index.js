import {combineReducers} from 'redux';

import movies from './movies'
import currentMovie from './movie'
import genres from './genres'

const reducers = combineReducers({
  movies,
  genres,
  currentMovie
});

export default reducers;
