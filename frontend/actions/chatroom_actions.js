
import * as ChatroomAPIUtil from '../util/chatroom_api_util';

export const RECEIVE_CHATROOMS = "RECEIVE_CHATROOMS";
export const RECEIVE_CHATROOM = "RECEIVE_CHATROOM";
export const RECEIVE_CHATROOM_MEMBERS = "RECEIVE_CHATROOM_MEMBERS";
export const RECEIVE_CREATE_CHATROOM = "RECEIVE_CREATE_CHATROOM";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_JOIN_CHATROOM = "RECEIVE_JOIN_CHATROOM";

// members for chatroom
export const receiveChatroomMembers = (members) =>{
  return {
    type: RECEIVE_CHATROOM_MEMBERS,
    members
  };
};

// chatrooms for current_user
export const receiveChatrooms = ({chatrooms, currentUserId}) =>{
  return {
    type: RECEIVE_CHATROOMS,
    chatrooms,
    currentUserId,
  };
};


// chatroom show // update chatroom
export const receiveChatroom = (chatroom) =>{
  return {
    type: RECEIVE_CHATROOM,
    chatroom
  };
};


// chatroom create
export const receiveCreateChatroom = (chatroom) =>{
  return {
    type: RECEIVE_CREATE_CHATROOM,
    chatroom
  };
};
//-----------------


// joined chatroom
export const receiveJoinChatroom = ({chatroom, current_user_id}) =>{
  return {
    type: RECEIVE_JOIN_CHATROOM,
    chatroom,
    currentUserId: current_user_id
  };
};


export const receiveErrors = errors =>{
  return {
    type: RECEIVE_ERRORS,
    errors
  }
}



// thunks ----------------------

// gets members for given chatroomId
export const getMembers = (chatroomId) =>{

  return (dispatch) => {
    const success = (members) => dispatch( receiveChatroomMembers(members)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.getMembers(chatroomId).then(
      success, failure
    );
  }// end return dispatch
};

// gets chatrooms based on current_user.id
export const getChatrooms = () =>{

  return (dispatch) => {
    const success = (chatrooms) => dispatch( receiveChatrooms(chatrooms)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.getChatrooms().then(
      success, failure
    );
  }// end return dispatch
};

// gets chatroom based on chatroomId
export const getChatroom = (chatroomId) =>{

  return (dispatch) => {
    const success = (chatroom) => dispatch( receiveChatroom(chatroom)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.getChatroom(chatroomId).then(
      success, failure
    );
  }// end return dispatch
};


// creates chatroom based on current_user
export const createChatroom = (chatroom) =>{

  return (dispatch) => {
    const success = (c) => dispatch( receiveCreateChatroom(c)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.createChatroom(chatroom).then(
      success, failure
    );
  }// end return dispatch
};



// joins chatroom based on current_user
export const joinChatroom = (chatroomId) =>{

  return (dispatch) => {
    const success = (payload) => dispatch( receiveJoinChatroom(payload)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.joinChatroom(chatroomId).then(
      success, failure
    );
  }// end return dispatch
};


// joins chatroom based on current_user
export const updateChatroom = (chatroom) =>{

  return (dispatch) => {
    const success = (c) => dispatch( receiveChatroom(c)  );
    const failure = (errors) => dispatch( receiveErrors(errors) ) ;

    return ChatroomAPIUtil.updateChatroom(chatroom).then(
      success, failure
    );
  }// end return dispatch
};
