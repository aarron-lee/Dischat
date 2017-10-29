# json.array! @users do |user|
#   json.extract! user, :id, :username
# end

all_users = {}
@users.each do |user|
  all_users[user.id] = { id: user.id, username: user.username }
end

json.users all_users
