
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS,
        RECEIVE_CHATROOM_MEMBERS} from '../actions/chatroom_actions';
import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE,
} from '../actions/message_actions';
import {RECEIVE_FRIENDS,
RECEIVE_FRIEND} from '../actions/friend_actions';

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
      return newState
    case RECEIVE_CHATROOM_MEMBERS:
      let newMembers ={};
      action.members.forEach((member) =>{
        newMembers[member.id] = member
      });
      return merge({}, state, newMembers);
    case RECEIVE_MESSAGES:
      newState = merge({}, state);
      let newMessages = {};

      Object.keys(action.messages).forEach( (key) =>{
        let message = action.messages[key];
        if( !newMessages[ message.author_id ]){
          newMessages[ message.author_id ] = { messages: [] };
        }
        newMessages[ message.author_id]['messages'].push(message.id);
      });

      return merge(newState, newMessages);

    case "RECEIVE_NEW_MEMBER":
      return merge({}, state, { [action.member.id] : action.member });

    case RECEIVE_FRIENDS:
      return merge({}, state, action.friends)
    case RECEIVE_FRIEND:
      return merge({}, state, { [action.friend.id] : action.friend} );

    case RECEIVE_MESSAGE:
      newState = merge({}, state);
      let author = newState[action.message.author_id];

      if(author.messages){
        author.messages.push(action.message.id);
      }else{
        author.messages = [action.message.id];
      }
      return merge(newState, { [author.id] : author})
    default:
      return state;
  }// end switch
}// end usersReducer

export default usersReducer;
