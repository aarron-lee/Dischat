friends = current_user.friends
channels = current_user.friend_channels

json.channels do
  channels.each do |channel|
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
    end
  end
end

json.friends do
  friends.each do |friend|
    json.set! friend.id do
      json.partial!('api/users/user', user: friend)
    end
  end
end
