
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS} from '../actions/chatroom_actions';



function usersReducer(state = {}, action){
  let newState;
  let user;
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      if (! action.user ){
        return {};
      }
      newState = merge({}, state, { [action.user.id]: action.user } );
      return newState;
    case RECEIVE_CREATE_CHATROOM:
      newState = merge({}, state)
      user = newState[action.chatroom.owner_id];
       user.chatrooms ?
        user.chatrooms.push(action.chatroom.id) :
        user.chatrooms = [action.chatroom.id];
      return newState;
    case RECEIVE_JOIN_CHATROOM:
      newState = merge({}, state);
      user = newState[action.currentUserId];
      if (user){
         user.chatrooms ?
         user.chatrooms.push(action.chatroom.id) :
         user.chatrooms = [action.chatroom.id];
      }
      return newState;
    case RECEIVE_CHATROOMS:
      newState = merge({}, state);
      user = newState[action.currentUserId];
      if (user){
        user.chatrooms = action.chatrooms.map( (chatroom) => {
          return chatroom.id;
        });
      }
      return newState;
    default:
      return state;
  }// end switch
}// end usersReducer

export default usersReducer;
