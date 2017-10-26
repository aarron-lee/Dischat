json.partial! '/api/users/user', user: @user
if @chatroom_memberships
  json.chatrooms(@chatroom_memberships.map{|membership| membership.id})
end
