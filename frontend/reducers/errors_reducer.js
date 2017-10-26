
import {RECEIVE_CURRENT_USER,
        RECEIVE_SESSION_ERRORS,
        CLEAR_ERRORS}
        from '../actions/session_actions';
import {CLOSE_MODAL} from '../actions/modal_actions';
const RECEIVE_ERRORS = "RECEIVE_ERRORS";

function errorsReducer( state = [], action){
  Object.freeze(state);
  let newState;
  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors.responseJSON ?
      action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_ERRORS:
      return [];
    case RECEIVE_ERRORS:
      if(action.errors.responseJSON){
        return action.errors.responseJSON;
      }else if (action.errors.responseText){
        return [action.errors.responseText]
      }else{
        return [action.errors.statusText]
      }
    case CLOSE_MODAL:
      return [];
    default:
      return state;
  }// end switch
}// end errorsReducer



export default errorsReducer;
