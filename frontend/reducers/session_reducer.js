
import {RECEIVE_CURRENT_USER,
        RECEIVE_SESSION_ERRORS}
        from '../actions/session_actions';


function sessionReducer( state = {}, action){
  Object.freeze(state);
  let newState;
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      // action.user
      newState = { currentUserId: action.user.id }
      return newState;
    default:
      return state;
  }// end switch
}// end sessionReducer



export default sessionReducer;
