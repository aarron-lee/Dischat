
import {OPEN_MODAL,
CLOSE_MODAL} from '../actions/modal_actions';
import { RECEIVE_CREATE_CHATROOM,
RECEIVE_JOIN_CHATROOM } from '../actions/chatroom_actions';


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
    default:
      return state;
  }
}// end modalsReducer




export default modalsReducer;
