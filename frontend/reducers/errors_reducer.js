
import {RECEIVE_CURRENT_USER,
        RECEIVE_SESSION_ERRORS}
        from '../actions/session_actions';


function errorsReducer( state = [], action){
  Object.freeze(state);
  let newState;
  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors.responseJSON ?
      action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }// end switch
}// end errorsReducer



export default errorsReducer;
