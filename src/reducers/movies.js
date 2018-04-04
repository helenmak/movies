const initialState = {
  results: null,
  page: 1,
  total_pages: 0,
  total_results: 0,
  query: ''
}

const moviesReducer = (state = initialState, action)=>{
  let _state = {...state}, _action = {...action};

  switch(_action.type){

    case 'SET_MOVIES':
      _state = {...state, ..._action.payload}
      break;
    case 'SET_QUERY':
      _state = {
        ...state,
        query: _action.payload
      }
      break;

    default:
      return state;
  }

  return _state;
}

export default moviesReducer

