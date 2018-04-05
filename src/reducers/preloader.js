import { List, Map } from 'immutable'

const initialState = Map({
  preloader: false
})

const preloaderReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SHOW_PRELOADER':
      return state.set('preloader', true)
      break
    case 'HIDE_PRELOADER':
      return state.set('preloader', false)
      break

    default:
      return state
  }
}

export default preloaderReducer

