import {combineReducers} from 'redux';

// import openSendingForm from './openSendingForm';
// import submitCard from './submitCard';
import movies from './movies';

const reducers = combineReducers({
  movies
  // openSendingForm,
  // submitCard,
  // cardData
});

export default reducers;
