
import {RECEIVE_FRIENDS,
RECEIVE_FRIEND} from '../actions/friend_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

import merge from 'lodash/merge';

function friendsReducer(state = [], action){
  let newState = merge([], state);
  switch(action.type){
    case RECEIVE_FRIENDS:
      return Object.keys(action.friends);
    case RECEIVE_FRIEND:
      return merge(newState, action.friend.id);
    case RECEIVE_CURRENT_USER:
        if (! action.user ){
          return [];
        }
        return state;
    default:
      return state;
  }// end switch
}// end friendsReducer

export default friendsReducer;
