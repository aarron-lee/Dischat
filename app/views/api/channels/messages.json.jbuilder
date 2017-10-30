messages = @channel.messages

messages_hsh = {}

messages.each do |message|
  messages_hsh[message.id] = {
    id: message.id,
    body: message.body,
    author_id: message.author_id,
    created_at: message.created_at
  }
end

json.messages messages_hsh
