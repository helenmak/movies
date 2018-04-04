const initialState = {
}

const genresReducer = (state = initialState, action)=>{
  let _state = {...state}, _action = {...action};

  switch(_action.type){

    case 'SET_GENRES':
      _state = {...state, ..._action.payload.genres}
      break;

    default:
      return state;
  }

  return _state;
}

export default genresReducer

