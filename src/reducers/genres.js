import { List, Map } from 'immutable'

const initialState = Map({})

const genresReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SET_GENRES':
      return state.merge(action.payload)
      break

    default:
      return state
  }
}

export default genresReducer

