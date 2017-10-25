class Chatroom < ApplicationRecord
  validates :title, :owner_id, presence: true

  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: :User

  has_many :members,
  foreign_key: :chatroom_id,
  class_name: :Member

  has_many :memberships,
  through: :members,
  source: :user

end
