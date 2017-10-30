
import * as MessageAPIUtil from '../util/message_api_util';


export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const receiveMessages = (messages)=>{
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}

export const receiveMessage = (message)=>{
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export const deleteMessage = (message) =>{
  return {
    type: DELETE_MESSAGE,
    messageId: message.id
  }
}


// thunks -----------------

// getMessages
// createMessage
// updateMessage
// deleteMessage

export const getMessages = (channelId) =>{
  return (dispatch)=>{
    let success = (messages) => dispatch(receiveMessages(messages));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return MessageAPIUtil.getMessages(channelId).next(
      success,
      failure
    );
  }
}

export const createMessage = (message) =>{
  return (dispatch)=>{
    let success = (message) => dispatch(receiveMessage(message));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return MessageAPIUtil.createMessage(message).next(
      success,
      failure
    );
  }
}

export const updateMessage = (message) =>{
  return (dispatch)=>{
    let success = (message) => dispatch(receiveMessage(message));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return MessageAPIUtil.updateMessage(message).next(
      success,
      failure
    );
  }
}

export const deleteMessage = (messageId) =>{
  return (dispatch)=>{
    let success = (message) => dispatch(deleteMessage(message));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return MessageAPIUtil.deleteMessage(messageId).next(
      success,
      failure
    );
  }
}



















//
