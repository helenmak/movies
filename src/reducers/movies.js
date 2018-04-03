const initialState = {
  result: null
}

const moviesReducer = (state = initialState, action)=>{
  let _state = {...state}, _action = {...action};

  switch(_action.type){

    case 'SET_MOVIES':
      _state = {
        ...state,
        result: _action.payload
      }
      break;

    default:
      return state;
  }

  return _state;
};

export default moviesReducer

