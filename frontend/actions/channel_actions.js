
import * as ChannelAPIUtil from '../util/channel_api_util';
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";



export const receiveChannels = (channels) =>{
  return { type: RECEIVE_CHANNELS,
    channels
  };
};

export const receiveChannel = (channel) =>{
  return { type: RECEIVE_CHANNEL,
    channel
  };
};



// thunks -----------------


// apiutil getChannels(chatroom_id)
export const getChannels = (chatroomId) =>{

  return (dispatch) =>{
    let success = (channels) => dispatch( receiveChannels(channels) );
    let failure = (errors) => dispatch( { type: "RECEIVE_ERRORS", errors: errors} );

    return ChannelAPIUtil.getChannels(chatroomId).then(
      success,
      failure
    );//end return
  } // end dispatch
};

// apiutil createChannel(channel)
export const createChannel = (channel) =>{

  return (dispatch) =>{
    let success = (c) => dispatch( receiveChannel(c) );
    let failure = (errors) => dispatch( { type: "RECEIVE_ERRORS", errors: errors} );

    return ChannelAPIUtil.createChannel(channel).then(
      success,
      failure
    );//end return
  } // end dispatch
};


// apiutil updateChannel(channel)
export const updateChannel = (channel) =>{

  return (dispatch) =>{
    let success = (c) => dispatch( receiveChannel(c) );
    let failure = (errors) => dispatch( { type: "RECEIVE_ERRORS", errors: errors} );

    return ChannelAPIUtil.updateChannel(channel).then(
      success,
      failure
    );//end return
  } // end dispatch
};










//
