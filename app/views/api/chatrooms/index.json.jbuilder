json.chatrooms do
  json.array! @chatrooms do |chatroom|
    json.partial! 'api/chatrooms/chatroom', chatroom: chatroom
    json.members(chatroom.members.map{|member| member.user_id})
  end
end

json.currentUserId current_user.id
