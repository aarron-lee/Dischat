
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CREATE_CHANNEL = "RECEIVE_CREATE_CHANNEL";



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

export const UPDATE_CHANNEL = (channel) =>{
  return { type: RECEIVE_CHANNEL,
    channel
  };
};

export const RECEIVE_CREATE_CHANNEL = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
}


// thunks -----------------
