
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_CREATE_CHATROOM,
RECEIVE_JOIN_CHATROOM } from '../actions/chatroom_actions';

import merge from 'lodash/merge';

function channelsReducer(state = {}, action){
  let newState = merge({}, state);
  let newChannels = {};
  switch(action.type){
    case RECEIVE_CHANNELS:
      action.channels.forEach( (channel) =>{
        newChannels[channel.id] = channel;
      });
      return merge(newState, newChannels);
    case RECEIVE_CHANNEL:
      return merge(newState, { [action.channel.id]: action.channel } )
    case RECEIVE_JOIN_CHATROOM:
      let channels = action.channels
      return merge(newState, channels )
    default:
      return state;
  }// end switch
}// end channelsReducer

export default channelsReducer;
