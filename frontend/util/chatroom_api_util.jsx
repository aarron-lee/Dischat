
// members for chatroom
// arr as return val
export const getMembers = (chatroomId) => {
  return $.ajax({
            method: 'get',
            url: '/api/chatrooms/' + chatroomId +'/members',
          }
        );
};


// chatrooms for current_user
// arr as return val
export const getChatrooms = () => {
  return $.ajax({
      method: 'get',
      url: '/api/users/chatrooms',
    });
};


// chatroom show
// responseJSON is obj
export const getChatroom = (chatroomId) => {
  return $.ajax({
    method: 'get',
    url: '/api/chatrooms/' + chatroomId,
  });
};


// create chatroom
// responseJSON is obj
export const createChatroom = (chatroom) => {
  return $.ajax({
    method: 'post',
    url: '/api/chatrooms',
    data: { chatroom: { title: chatroom.title} } } );
  };


// update chatroom, must be owner
// responseJSON is obj
export const updateChatroom = (chatroom) => {
  return $.ajax({
    method: 'patch',
    url: '/api/chatrooms/' + chatroom.id,
    data: { chatroom: {owner_id: chatroom.owner_id, title: chatroom.title} } } );
  };


// join chatroom as current_user
// responseJSON is obj
export const joinChatroom = (chatroomId) => {
  return $.ajax({
    method: 'post',
    url: "/api/chatrooms/".concat(chatroomId).concat("/join"),
  });

};
