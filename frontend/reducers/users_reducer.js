
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';

function usersReducer(state = {}, action){
  let newState;
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      if (! action.user ){
        // logout, wipe out state
        return {};
      }
      newState = merge({}, state, { [action.user.id]: action.user } );
      return newState;
    default:
      return state;
  }// end switch
}// end usersReducer

export default usersReducer;
