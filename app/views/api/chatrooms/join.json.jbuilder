json.chatroom do
  json.partial! 'api/chatrooms/chatroom', chatroom: @chatroom
  json.members(@chatroom.members.map{|member| member.user_id})
  json.channels(@chatroom.channels.map{|channel| channel.id})
end

new_channels = {}
@chatroom.channels.each do |channel|
  new_channels[channel.id] = { id: channel.id,
                              name: channel.name,
                              chatroom_id: channel.chatroom_id,
                              description: channel.description }
end

json.channels new_channels

json.current_user_id current_user.id
