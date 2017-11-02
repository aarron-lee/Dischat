# @channel and @user2

json.channel do
  json.set! channel.id do
    json.partial! 'api/channels/channel', channel: channel
  end
end

json.friend do
  json.set! friend.id do
    json.partial!('api/users/user', user: friend)
  end
end
