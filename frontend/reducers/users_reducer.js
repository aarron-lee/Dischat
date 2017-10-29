
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS,
        RECEIVE_CHATROOM_MEMBERS} from '../actions/chatroom_actions';



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
      user.chatrooms = user.chatrooms.sort()
      return newState;
    case RECEIVE_CHATROOMS:
      newState = merge({}, state);
      user = newState[action.currentUserId];
      if (user){
        user.chatrooms = action.chatrooms.map( (chatroom) => {
          return chatroom.id;
        });
      }
      user.chatrooms = user.chatrooms.sort()
      return newState;
    case RECEIVE_CHATROOM_MEMBERS:
      return merge({}, state, action.members);
    case "RECEIVE_NEW_MEMBER":
      return merge({}, state, { [action.member.id] : action.member });
    default:
      return state;
  }// end switch
}// end usersReducer

export default usersReducer;
