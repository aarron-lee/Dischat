
import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE,
} from '../actions/message_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

import merge from 'lodash/merge';

function messagesReducer(state = {}, action){
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return merge(newState, action.messages);
    case RECEIVE_MESSAGE:
      return merge(newState, {[action.message.id]: action.message})
    case DELETE_MESSAGE:
      delete newState[action.messageId]
      return newState;
    case RECEIVE_CURRENT_USER:
        if (! action.user ){
          return {};
        }
        return state;
    default:
      return state;
  }// end switch
}// end messagesReducer

export default messagesReducer;
