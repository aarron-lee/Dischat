
import {RECEIVE_CHANNELS,
RECEIVE_CHANNEL} from '../actions/channel_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE,
} from '../actions/message_actions';

import merge from 'lodash/merge';

function channelsReducer(state = {}, action){
  let newState = merge({}, state);
  let currentChannel;
  switch(action.type){
    case RECEIVE_CHANNELS:
      let newChannels = {}
      action.channels.forEach( (channel) =>{
        newChannels[channel.id] = channel;
      });
      return merge(newState, newChannels);
    case RECEIVE_CHANNEL:
      return merge(newState, { [action.channel.id]: action.channel } )
    case RECEIVE_MESSAGES:
      let messageIds = Object.keys(action.messages);
      if(messageIds && messageIds.length === 0){
        return state;
      }
      let currentChannelId = action.messages[messageIds[0]].channel_id;

      if(!newState[currentChannelId]){
        newState[currentChannelId] = { id: currentChannelId, messages: [] };
      }

      currentChannel = newState[currentChannelId];

      if(currentChannel){
        currentChannel.messages = currentChannel.messages
        ?  messageIds :
        messageIds;
      }
      return merge(newState, { [currentChannel.id] : currentChannel});

    case RECEIVE_MESSAGE:
      if(!action.message){
        return state;
      }

      if( action.message && action.message.id ){
        currentChannel = newState[action.message.channel_id]
      }
      if(currentChannel){
        currentChannel.messages = currentChannel.messages
        ? currentChannel.messages.concat( action.message.id.toString() ) :
        [action.message.id.toString()];
      }
      return merge(newState, { [currentChannel.id] : currentChannel});

      case RECEIVE_CURRENT_USER:
      if (! action.user ){
        return {};
      }
      return state;
    default:
      return state;
  }// end switch
}// end channelsReducer

export default channelsReducer;
