json.extract! @message, :id, :author_id, :channel_id, :body, :created_at
json.image_exists @message.image.exists?
json.image_url asset_path(@message.image.url(:medium))
json.image_width @message.image.width(:medium)
json.image_height @message.image.height(:medium)
