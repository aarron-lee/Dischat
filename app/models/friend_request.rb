class FriendRequest < ApplicationRecord
  validates :user_from_id, :user_to_id, :approved, presence: true

  belongs to :user_from,
  foreign_key: :user_from_id,
  class_name: :User

  belongs_to :user_to,
  foreign_key: :user_to_id,
  class_name: :User

  after_initialize :ensure_approved_status


  private

  def ensure_approved_status
    self.approved ||= false
  end
  
end
