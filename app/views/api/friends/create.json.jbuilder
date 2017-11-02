# @channel and @user2

json.channel do
  json.set! @channel.id do
    json.partial! 'api/channels/channel', channel: @channel
  end
end

json.friend do
  json.set! @user2.id do
    json.partial!('api/users/user', user: @user2)
  end
end
