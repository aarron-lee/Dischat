json.array! @chatrooms do |chatroom|
  json.partial! 'api/chatrooms/chatroom', chatroom: chatroom
end
