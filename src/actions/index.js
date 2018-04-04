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

export function setQuery(query){
  return {
    type: 'SET_QUERY',
    payload: query
  }
}

export function fetchGenres(){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.fetchGenres())
      dispatch(setGenres(data))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
      dispatch(showSuccessMsg());
    }
  }
}

export function setGenres(genres){
  return {
    type: 'SET_GENRES',
    payload: genres
  }
}

export function fetchMovies({query = '', page = 1}){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.searchMovie(query, page))
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

export function fetchCurrentMovie(id){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.fetchMovie(id))
      dispatch(setCurrentMovie(data))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
      dispatch(showSuccessMsg());
    }
  }
}

export function setCurrentMovie(data){
  return {
    type: 'SET_CURRENT_MOVIE',
    payload: data
  }
}

export function abortSubmit(err){
  return {
    type: "ABORT_SUBMIT",
    payload: err
  }
}
