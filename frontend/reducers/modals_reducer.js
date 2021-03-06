
import {OPEN_MODAL,
CLOSE_MODAL} from '../actions/modal_actions';
import { RECEIVE_CREATE_CHATROOM,
RECEIVE_JOIN_CHATROOM } from '../actions/chatroom_actions';
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_FRIEND} from '../actions/friend_actions';
const modalsReducer = ( state = null, action) =>{
  switch(action.type){
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    case RECEIVE_CREATE_CHATROOM:
      return null;
    case RECEIVE_JOIN_CHATROOM:
      return null;
    case RECEIVE_CHANNEL:
      if(state){
        return null;
      }
      return state;
    case RECEIVE_FRIEND:
      return null;
    case RECEIVE_CURRENT_USER:
      if (! action.user ){
        return null;
      }
      return state;
    default:
      return state;
  }
}// end modalsReducer




export default modalsReducer;
