
// get messages for channel
export const getMessages = (channelId) =>{
  return $.ajax({
    method: 'get',
    url: '/api/channels/' + channelId +'/messages',
  })
} // return messages:{ 0: message, 1: message, ...}


// creates post to channel_id, current_user as author/
export const createMessage = (message) =>{
  return $.ajax({
    method: 'post',
    url: '/api/messages',
    data: { message: }
  });
} // returns { id: 6...etc }, actual message obj


// edits post
export const updateMessage = (message) =>{
  return $.ajax({
    method: 'patch',
    url: '/api/messages/' + message.id,
    data: { message }
  });
}// returns { id: 6...etc }, actual message obj

// deletes message
export const deleteMessage = (messageId) =>{
  return $.ajax({
    method: 'delete',
    url: '/api/messages/' + messageId,
  })
}// returns { id: 6...etc }, actual message obj
