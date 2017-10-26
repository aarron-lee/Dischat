json.chatroom do
  json.partial! 'api/chatrooms/chatroom', chatroom: @chatroom
  json.members(@chatroom.members.map{|member| member.user_id}.sort)
end

json.current_user_id current_user.id
