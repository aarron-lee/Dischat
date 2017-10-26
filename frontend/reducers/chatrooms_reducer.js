
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS} from '../actions/chatroom_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

import merge from 'lodash/merge';

function chatroomsReducer(state = {}, action){
  let newState;
  let newChatroom;
  switch(action.type){
    case RECEIVE_CREATE_CHATROOM:
      newChatroom = action.chatroom;
      newState = merge({}, state, { [action.chatroom.id] : newChatroom });
      return newState;
    case RECEIVE_JOIN_CHATROOM:
      newChatroom = action.chatroom;
      newState = merge({}, state, { [action.chatroom.id] : newChatroom });
      return newState;

    case RECEIVE_CURRENT_USER:
      if (! action.user ){
          return {};
      }
      return state;
    case RECEIVE_CHATROOMS:
      newState = merge({}, state);
      action.chatrooms.forEach( (chatroom, idx) =>{
        newState[chatroom.id] = chatroom ;
      });
      return newState;

    default:
      return state;
  }// end switch
}// end chatroomsReducer

export default chatroomsReducer;
