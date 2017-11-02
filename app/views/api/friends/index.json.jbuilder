friends = current_user.friends
channels = current_user.friend_channels

friend_objs = channels.map do |channel|
  # has user_id, friend_id, channel_id
  Friend.find_by(channel_id: channel.id)
end

friend_channels = {}

friend_objs.each do |f|
  if ( f.user_id != current_user.id )
     friend_channels[f.user_id] = f.channel_id
  end
  if ( f.friend_id != current_user.id )
    friend_channels[f.friend_id] = f.channel_id
  end
end


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
      json.channel_id friend_channels[friend.id]
    end
  end
end
