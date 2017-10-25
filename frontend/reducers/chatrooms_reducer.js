
import {RECEIVE_CREATE_CHATROOM} from '../actions/chatroom_actions';
import merge from 'lodash/merge';

function chatroomsReducer(state = {}, action){
  let newState;
  switch(action.type){
    case RECEIVE_CREATE_CHATROOM:
      let newChatroom = action.chatroom;
      if (newChatroom.members){
        newChatroom.members.push(newChatroom.owner_id);
      }else{
        newChatroom.members = [newChatroom.owner_id];
      }
      newState = merge({}, state, { [action.chatroom.id] : newChatroom });
      return newState;

    default:
      return state;
  }// end switch
}// end chatroomsReducer

export default chatroomsReducer;
