
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';
import {RECEIVE_CREATE_CHATROOM,
        RECEIVE_JOIN_CHATROOM,
        RECEIVE_CHATROOMS} from '../actions/chatroom_actions';

const activeChatroomReducer = ( state = null, action) =>{
  switch(action.type){
    case RECEIVE_CREATE_CHATROOM:
      return action.chatroom.id;
    case RECEIVE_JOIN_CHATROOM:
      return action.chatroom.id;
    case RECEIVE_CHATROOMS:
      if(action.chatrooms[0]){
        let ids = Object.values(action.chatrooms).map( (chatroom) => chatroom.id);
        return ids.sort()[0];
      }
      return null;
    case "RECEIEVE_ACTIVE_CHATROOM":
      return action.chatroom.id

    default:
      return state;
  }
}// end activeChatroomReducer




export default activeChatroomReducer;
