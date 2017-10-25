
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';
import {RECEIVE_CREATE_CHATROOM} from '../actions/chatroom_actions';


function usersReducer(state = {}, action){
  let newState;
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      if (! action.user ){
        return {};
      }
      newState = merge({}, state, { [action.user.id]: action.user } );
      return newState;
    case RECEIVE_CREATE_CHATROOM:
      newState = merge({}, state)
      const uId = action.chatroom.owner_id;
      let user = newState[uId];
       if (user.chatrooms){
         user.chatrooms.push(action.chatroom.id);
       }else{
         user.chatrooms = [action.chatroom.id];
       }
      return merge(newState, user);


    default:
      return state;
  }// end switch
}// end usersReducer

export default usersReducer;
