

import { RECEIVE_CREATE_CHATROOM,
RECEIVE_JOIN_CHATROOM } from '../actions/chatroom_actions';
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';


const activeChannelReducer = ( state = null, action) =>{
  switch(action.type){
    case "RECEIEVE_ACTIVE_CHANNEL":
      return action.channel.id;
    case RECEIVE_CHANNEL:
      return action.channel.id;
    case RECEIVE_CHANNELS:
      if( action.channels[0] ){
        return action.channels[0].id;
      }
      return null;
    case RECEIVE_JOIN_CHATROOM:
      return action.chatroom.channels[0];
    case RECEIVE_CURRENT_USER:
        if (! action.user ){
          return null;
        }
        return state;
    default:
      return state;
  }
}// end activeChannelReducer




export default activeChannelReducer;
