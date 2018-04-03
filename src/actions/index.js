import * as api from '../utils/api'
import axios from 'axios'

export function showPreloader(){
  return {
    type: 'SHOW_PRELOADER',
  }
}

export function hidePreloader(){
  return {
    type: 'HIDE_PRELOADER',
  }
}

export function showSuccessMsg(){
  return (dispatch)=> {
    setTimeout(()=>{
      dispatch(hideSuccessMsg());
    }, 4*1000)
    return dispatch({type: 'SHOW_SUCCESS_MSG'});
  }
}

export function hideSuccessMsg(){
  return {
    type: 'HIDE_SUCCESS_MSG',
  }
}

export function fetchMovies(query){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.searchMovie(query))
      dispatch(setMovies(data))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
      dispatch(showSuccessMsg());
    }
  }
}

export function setMovies(data){
  return {
    type: 'SET_MOVIES',
    payload: data
  }
}

export function abortSubmit(err){
  return {
    type: "ABORT_SUBMIT",
    payload: err
  }
}
