# json.extract! user, :id, :email_address, :username, avatar_url: asset_path(user.avatar.url)
json.id user.id
json.email_address user.email_address
json.username user.username
json.avatar_url asset_path(user.avatar.url)
