class Friend < ApplicationRecord
  validates :user_id, :friend_id, :channel_id, presence: true

  validates :user_id, uniqueness: {scope: :friend_id}

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :friend,
  foreign_key: :friend_id,
  class_name: :User

  belongs_to :channel,
  foreign_key: :channel_id,
  class_name: :Channel

end
