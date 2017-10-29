require 'pusher'

Pusher.app_id = Figaro.env.PUSHER_APP_ID
Pusher.key = Figaro.env.PUSHER_KEY
Pusher.secret = Figar.env.PUSHER_SECRET
Pusher.cluster = 'us2'
Pusher.logger = Rails.logger
Pusher.encrypted = true
