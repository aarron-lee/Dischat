json.chatroom do
  json.partial! 'api/chatrooms/chatroom', chatroom: @chatroom
end
json.current_user do
  json.id  @current_user.id
end
