class Channel < ApplicationRecord
  validates :name, :chatroom_id, presence: true

  after_initialize :ensure_description


  belongs_to :chatroom,
  foreign_key: :chatroom_id,
  class_name: :Chatroom

  private

  def ensure_description
    self.description ||= ''
  end

end
