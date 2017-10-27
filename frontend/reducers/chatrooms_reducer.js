
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS} from '../actions/chatroom_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';

import merge from 'lodash/merge';

function chatroomsReducer(state = {}, action){
  let newState;
  let newChatroom;
  let chatroomId;
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


    case RECEIVE_CHANNELS:
      if(action.channels.length <= 0){
        return state;
      }
      newState = merge({}, state);
      chatroomId = action.channels[0].chatroom_id;
      let newChannelIds = action.channels.map( (channel) =>{
        return channel.id;
      });

      if( newState[chatroomId] ){
        if( newState[chatroomId].channels ){
          newState[chatroomId].channels = merge( newState[chatroomId].channels, newChannelIds);
        }else{
          newState[chatroomId].channels = newChannelIds;
        }
      }
      return newState;
    case RECEIVE_CHANNEL:
      newState = merge({}, state);
      chatroomId = action.channel.chatroom_id;
      if( newState[chatroomId] ){
        if( newState[chatroomId].channels ){
          newState[chatroomId].channels.push(action.channel.id);
        }else{
          newState[chatroomId].channels = [action.channel.id]
        }
      }
      return newState;

    default:
      return state;
  }// end switch
}// end chatroomsReducer

export default chatroomsReducer;
