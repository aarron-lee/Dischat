json.partial! 'api/chatrooms/chatroom', chatroom: @chatroom
json.members [@chatroom.owner_id]
