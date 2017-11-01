messages = @channel.messages

messages_hsh = {}

messages.each do |message|
  messages_hsh[message.id] = {
    id: message.id,
    channel_id: message.channel_id,
    body: message.body,
    author_id: message.author_id,
    created_at: message.created_at,
    image_exists: message.image.exists?,
    image_url: asset_path(message.image.url(:medium)),
    image_width: message.image.width(:medium),
    image_height: message.image.height(:medium)
  }
end

json.messages messages_hsh
